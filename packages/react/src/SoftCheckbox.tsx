import React, { forwardRef, useState, useId } from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftCheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Accent color when checked (dual-signaling) */
  accentColor?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Accessible label (if no visible label) */
  "aria-label"?: string;
}

/**
 * Neumorphic checkbox with extruded (unchecked) → inset (checked) depth shift.
 * Checked state shows an SVG checkmark AND accent color fill (dual-signaling).
 */
export const SoftCheckbox = forwardRef<HTMLInputElement, SoftCheckboxProps>(
  function SoftCheckbox(
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      accentColor = "#4A90D9",
      disabled = false,
      label,
      ...ariaProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const id = useId();

    const isChecked = controlledChecked ?? internalChecked;

    const handleChange = () => {
      if (disabled) return;
      const next = !isChecked;
      if (controlledChecked === undefined) {
        setInternalChecked(next);
      }
      onChange?.(next);
    };

    const extrudedShadow = `3px 3px 6px ${tokens.darkShadow}, -3px -3px 6px ${tokens.lightShadow}`;
    const insetShadow = `inset 2px 2px 4px ${tokens.darkShadow}, inset -2px -2px 4px ${tokens.lightShadow}`;

    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
        }}
        onClick={handleChange}
      >
        {/* Hidden native checkbox for form integration */}
        <input
          ref={ref}
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          aria-label={!label ? ariaProps["aria-label"] : undefined}
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
          onFocus={(e) => {
            if (e.target.matches(":focus-visible")) setIsFocusVisible(true);
          }}
          onBlur={() => setIsFocusVisible(false)}
        />

        {/* Visual checkbox */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <motion.div
            aria-hidden="true"
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: isChecked ? accentColor : tokens.background,
              boxShadow: isChecked ? insetShadow : extrudedShadow,
              border: tokens.outline,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            animate={{
              boxShadow: isChecked ? insetShadow : extrudedShadow,
              background: isChecked ? accentColor : tokens.background,
            }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            {/* SVG Checkmark */}
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              animate={{ opacity: isChecked ? 1 : 0, scale: isChecked ? 1 : 0.5 }}
              transition={{ duration: 0.15 }}
            >
              <path
                d="M2.5 7L5.5 10L11.5 4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
          <FocusRing visible={isFocusVisible} borderRadius={6} />
        </div>

        {label && (
          <label
            htmlFor={id}
            style={{
              cursor: disabled ? "not-allowed" : "pointer",
              userSelect: "none",
            }}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
