import React, { forwardRef, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftSliderProps {
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
  /** Accent color for the filled track portion */
  accentColor?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Accessible label */
  "aria-label"?: string;
  /** Custom value text for screen readers */
  "aria-valuetext"?: string;
  /** Track width in pixels */
  width?: number;
}

/**
 * Neumorphic range slider with inset track, extruded thumb,
 * and accent-colored fill for the completed portion.
 */
export const SoftSlider = forwardRef<HTMLDivElement, SoftSliderProps>(
  function SoftSlider(
    {
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      accentColor = "#4A90D9",
      disabled = false,
      width = 200,
      ...ariaProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    const currentValue = controlledValue ?? internalValue;
    const percent = ((currentValue - min) / (max - min)) * 100;

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

    const getValueFromPointer = (clientX: number) => {
      if (!trackRef.current) return currentValue;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;
      return min + ratio * (max - min);
    };

    const handlePointerDown = (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      updateValue(getValueFromPointer(e.clientX));
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDragging || disabled) return;
      updateValue(getValueFromPointer(e.clientX));
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      let newVal = currentValue;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        newVal = currentValue + step;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
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

    const trackInsetShadow = `inset 2px 2px 4px ${tokens.darkShadow}, inset -2px -2px 4px ${tokens.lightShadow}`;
    const thumbShadow = `3px 3px 6px ${tokens.darkShadow}, -3px -3px 6px ${tokens.lightShadow}`;

    return (
      <div
        ref={ref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          width,
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "default",
        }}
      >
        {/* Track */}
        <div
          ref={trackRef}
          style={{
            position: "relative",
            width: "100%",
            height: 8,
            borderRadius: 4,
            background: tokens.background,
            boxShadow: trackInsetShadow,
            border: tokens.outline,
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Filled portion */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${percent}%`,
              background: accentColor,
              borderRadius: 4,
              transition: isDragging ? "none" : "width 0.1s ease",
            }}
          />

          {/* Thumb */}
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
              onFocus={(e) => {
                if ((e.target as HTMLElement).matches(":focus-visible"))
                  setIsFocusVisible(true);
              }}
              onBlur={() => setIsFocusVisible(false)}
              style={{
                position: "absolute",
                top: -8,
                left: `${percent}%`,
                transform: "translateX(-50%)",
                width: 24,
                height: 24,
                borderRadius: 12,
                background: tokens.background,
                boxShadow: thumbShadow,
                border: `2px solid ${accentColor}`,
                outline: "none",
                cursor: disabled ? "not-allowed" : "grab",
                zIndex: 1,
              }}
              whileHover={!disabled ? { scale: 1.1 } : undefined}
              transition={{ duration: 0.1 }}
            />
            <div
              style={{
                position: "absolute",
                top: -8,
                left: `${percent}%`,
                transform: "translateX(-50%)",
              }}
            >
              <FocusRing visible={isFocusVisible} borderRadius={12} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
