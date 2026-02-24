import React, { forwardRef, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftKnobProps {
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Diameter of the knob in pixels */
  size?: number;
  /** Accent color for the filled arc and indicator */
  accentColor?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Custom value text for screen readers */
  "aria-valuetext"?: string;
}

/** Angle range: the knob sweeps from 225° (min) to -45° (max), i.e. 270° total arc */
const START_ANGLE = 225;
const END_ANGLE = -45;
const ARC_RANGE = START_ANGLE - END_ANGLE; // 270°

function valueToAngle(value: number, min: number, max: number): number {
  const ratio = (value - min) / (max - min);
  return START_ANGLE - ratio * ARC_RANGE;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const sweep = startAngle - endAngle;
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

/**
 * Neumorphic rotary knob control.
 * Drag vertically or around the knob to change value.
 * Supports keyboard (arrow keys, Home/End) and full ARIA.
 */
export const SoftKnob = forwardRef<HTMLDivElement, SoftKnobProps>(
  function SoftKnob(
    {
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      size = 80,
      accentColor = "#4A90D9",
      disabled = false,
      ...ariaProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef<{ y: number; startValue: number } | null>(null);

    const currentValue = controlledValue ?? internalValue;
    const clamp = (val: number) => Math.min(max, Math.max(min, val));
    const snap = (val: number) => Math.round(val / step) * step;

    const updateValue = useCallback(
      (val: number) => {
        const clamped = clamp(snap(val));
        if (controlledValue === undefined) {
          setInternalValue(clamped);
        }
        onChange?.(clamped);
      },
      [controlledValue, onChange, min, max, step]
    );

    const handlePointerDown = (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      dragStartRef.current = { y: e.clientY, startValue: currentValue };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDragging || disabled || !dragStartRef.current) return;
      const deltaY = dragStartRef.current.y - e.clientY;
      const sensitivity = (max - min) / 150;
      const newVal = dragStartRef.current.startValue + deltaY * sensitivity;
      updateValue(newVal);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      let newVal = currentValue;
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault();
        newVal = currentValue + step;
      } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault();
        newVal = currentValue - step;
      } else if (e.key === "Home") {
        e.preventDefault();
        newVal = min;
      } else if (e.key === "End") {
        e.preventDefault();
        newVal = max;
      }
      updateValue(newVal);
    };

    const half = size / 2;
    const trackRadius = half - 8;
    const angle = valueToAngle(currentValue, min, max);
    const indicatorLength = trackRadius - 6;

    const extrudedShadow = `6px 6px 12px ${tokens.darkShadow}, -6px -6px 12px ${tokens.lightShadow}`;
    const innerInsetShadow = `inset 3px 3px 6px ${tokens.darkShadow}, inset -3px -3px 6px ${tokens.lightShadow}`;

    // Arc paths
    const trackArcPath = describeArc(half, half, trackRadius, START_ANGLE, END_ANGLE);
    const filledArcPath =
      currentValue > min
        ? describeArc(half, half, trackRadius, START_ANGLE, angle)
        : "";

    // Indicator dot position
    const indicatorPos = polarToCartesian(half, half, indicatorLength, angle);

    return (
      <div
        ref={ref}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "default",
        }}
      >
        <div style={{ position: "relative" }}>
          <motion.div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuenow={currentValue}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuetext={ariaProps["aria-valuetext"]}
            aria-label={ariaProps["aria-label"]}
            aria-disabled={disabled}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onFocus={(e) => {
              if ((e.target as HTMLElement).matches(":focus-visible"))
                setIsFocusVisible(true);
            }}
            onBlur={() => setIsFocusVisible(false)}
            style={{
              width: size,
              height: size,
              borderRadius: half,
              background: tokens.background,
              boxShadow: extrudedShadow,
              border: tokens.outline,
              outline: "none",
              cursor: disabled ? "not-allowed" : isDragging ? "grabbing" : "grab",
              position: "relative",
              touchAction: "none",
            }}
          >
            {/* Inner inset circle */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                width: size - 20,
                height: size - 20,
                borderRadius: "50%",
                boxShadow: innerInsetShadow,
              }}
            />

            {/* SVG arc track + filled arc + indicator */}
            <svg
              width={size}
              height={size}
              style={{ position: "absolute", top: 0, left: 0 }}
              aria-hidden="true"
            >
              {/* Background track arc */}
              <path
                d={trackArcPath}
                fill="none"
                stroke={tokens.darkShadow}
                strokeWidth={3}
                strokeLinecap="round"
                opacity={0.3}
              />
              {/* Filled arc */}
              {filledArcPath && (
                <path
                  d={filledArcPath}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              )}
              {/* Indicator dot */}
              <circle
                cx={indicatorPos.x}
                cy={indicatorPos.y}
                r={4}
                fill={accentColor}
              />
            </svg>
          </motion.div>
          <FocusRing visible={isFocusVisible} borderRadius={half} />
        </div>
      </div>
    );
  }
);
