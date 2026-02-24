import React, { forwardRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftStepperProps {
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
  /** Disabled state */
  disabled?: boolean;
  /** Accent color for buttons */
  accentColor?: string;
  /** Accessible label */
  "aria-label"?: string;
}

/**
 * Neumorphic numeric stepper.
 * Extruded "−" and "+" buttons flanking an inset value display.
 * Supports keyboard control when focused.
 */
export const SoftStepper = forwardRef<HTMLDivElement, SoftStepperProps>(
  function SoftStepper(
    {
      value: controlledValue,
      defaultValue = 0,
      min = -Infinity,
      max = Infinity,
      step = 1,
      onChange,
      disabled = false,
      accentColor = "#4A90D9",
      ...ariaProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocusVisible, setIsFocusVisible] = useState(false);

    const currentValue = controlledValue ?? internalValue;

    const clamp = (val: number) => Math.min(max, Math.max(min, val));

    const updateValue = useCallback(
      (val: number) => {
        const clamped = clamp(val);
        if (controlledValue === undefined) {
          setInternalValue(clamped);
        }
        onChange?.(clamped);
      },
      [controlledValue, onChange, min, max]
    );

    const increment = () => {
      if (!disabled) updateValue(currentValue + step);
    };

    const decrement = () => {
      if (!disabled) updateValue(currentValue - step);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault();
        increment();
      } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault();
        decrement();
      }
    };

    const canDecrement = currentValue - step >= min;
    const canIncrement = currentValue + step <= max;

    const extrudedShadow = `3px 3px 6px ${tokens.darkShadow}, -3px -3px 6px ${tokens.lightShadow}`;
    const pressedShadow = `inset 2px 2px 4px ${tokens.darkShadow}, inset -2px -2px 4px ${tokens.lightShadow}`;
    const insetShadow = `inset 3px 3px 6px ${tokens.darkShadow}, inset -3px -3px 6px ${tokens.lightShadow}`;

    const buttonStyle = (canAct: boolean): React.CSSProperties => ({
      width: 40,
      height: 40,
      borderRadius: 10,
      background: tokens.background,
      boxShadow: extrudedShadow,
      border: tokens.outline,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: disabled || !canAct ? "not-allowed" : "pointer",
      opacity: disabled || !canAct ? 0.5 : 1,
      fontSize: 20,
      fontWeight: 600,
      color: accentColor,
      padding: 0,
      outline: "none",
      fontFamily: "inherit",
    });

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaProps["aria-label"]}
        onKeyDown={handleKeyDown}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {/* Decrement button */}
        <motion.button
          type="button"
          aria-label="Decrease"
          disabled={disabled || !canDecrement}
          onClick={decrement}
          style={buttonStyle(canDecrement)}
          whileTap={!disabled && canDecrement ? { boxShadow: pressedShadow, scale: 0.95 } : undefined}
          transition={{ duration: 0.1 }}
        >
          −
        </motion.button>

        {/* Value display */}
        <div style={{ position: "relative" }}>
          <div
            tabIndex={disabled ? -1 : 0}
            role="spinbutton"
            aria-valuenow={currentValue}
            aria-valuemin={min === -Infinity ? undefined : min}
            aria-valuemax={max === Infinity ? undefined : max}
            aria-label={ariaProps["aria-label"]}
            aria-disabled={disabled}
            onFocus={(e) => {
              if ((e.target as HTMLElement).matches(":focus-visible"))
                setIsFocusVisible(true);
            }}
            onBlur={() => setIsFocusVisible(false)}
            onKeyDown={handleKeyDown}
            style={{
              minWidth: 56,
              height: 40,
              borderRadius: 10,
              background: tokens.background,
              boxShadow: insetShadow,
              border: tokens.outline,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
              color: tokens.textColor,
              padding: "0 12px",
              outline: "none",
              userSelect: "none",
            }}
          >
            {currentValue}
          </div>
          <FocusRing visible={isFocusVisible} borderRadius={10} />
        </div>

        {/* Increment button */}
        <motion.button
          type="button"
          aria-label="Increase"
          disabled={disabled || !canIncrement}
          onClick={increment}
          style={buttonStyle(canIncrement)}
          whileTap={!disabled && canIncrement ? { boxShadow: pressedShadow, scale: 0.95 } : undefined}
          transition={{ duration: 0.1 }}
        >
          +
        </motion.button>
      </div>
    );
  }
);
