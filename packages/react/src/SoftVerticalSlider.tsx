import React, { forwardRef, useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftVerticalSliderProps {
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
  /** Track height in pixels */
  height?: number;
}

/**
 * Neumorphic vertical slider (volume/mixer style).
 * Inset track with accent-colored fill from the bottom,
 * and an extruded circular thumb.
 */
export const SoftVerticalSlider = forwardRef<HTMLDivElement, SoftVerticalSliderProps>(
  function SoftVerticalSlider(
    {
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      accentColor = "#4A90D9",
      disabled = false,
      height = 200,
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

    const getValueFromPointer = useCallback(
      (clientY: number) => {
        if (!trackRef.current) return currentValue;
        const rect = trackRef.current.getBoundingClientRect();
        // Inverted: top = max, bottom = min
        const ratio = 1 - (clientY - rect.top) / rect.height;
        return min + ratio * (max - min);
      },
      [currentValue, min, max]
    );

    const handlePointerDown = (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      updateValue(getValueFromPointer(e.clientY));
    };

    // Use window-level listeners so dragging works even outside the narrow track
    useEffect(() => {
      if (!isDragging) return;

      const onPointerMove = (e: PointerEvent) => {
        updateValue(getValueFromPointer(e.clientY));
      };
      const onPointerUp = () => {
        setIsDragging(false);
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };
    }, [isDragging, getValueFromPointer, updateValue]);

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
        newVal = max;
      } else if (e.key === "End") {
        e.preventDefault();
        newVal = min;
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
          justifyContent: "center",
          height,
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "default",
        }}
      >
        {/* Track */}
        <div
          ref={trackRef}
          style={{
            position: "relative",
            width: 8,
            height: "100%",
            borderRadius: 4,
            background: tokens.background,
            boxShadow: trackInsetShadow,
            border: tokens.outline,
          }}
          onPointerDown={handlePointerDown}
        >
          {/* Filled portion (from bottom) */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: `${percent}%`,
              background: accentColor,
              borderRadius: 4,
              transition: isDragging ? "none" : "height 0.1s ease",
            }}
          />

          {/* Thumb */}
          <div style={{ position: "relative" }}>
            <motion.div
              role="slider"
              aria-orientation="vertical"
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
                left: -8,
                bottom: `${percent}%`,
                transform: "translateY(50%)",
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
                left: -8,
                bottom: `${percent}%`,
                transform: "translateY(50%)",
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
