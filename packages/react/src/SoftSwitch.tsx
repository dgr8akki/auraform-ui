import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftSwitchProps {
  /** Whether the switch is checked */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Accent color when active (dual-signaling) */
  accentColor?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Accessible label */
  "aria-label"?: string;
}

/**
 * Neumorphic toggle switch.
 * Uses physical depth (extruded vs inset track) AND accent color
 * to indicate on/off state — never relies on shadows alone.
 */
export const SoftSwitch = forwardRef<HTMLButtonElement, SoftSwitchProps>(
  function SoftSwitch(
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      accentColor = "#4A90D9",
      disabled = false,
      ...ariaProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const [isFocusVisible, setIsFocusVisible] = useState(false);

    const isChecked = controlledChecked ?? internalChecked;

    const handleToggle = () => {
      if (disabled) return;
      const next = !isChecked;
      if (controlledChecked === undefined) {
        setInternalChecked(next);
      }
      onChange?.(next);
    };

    const trackShadow = isChecked
      ? `inset 3px 3px 6px ${tokens.darkShadow}, inset -3px -3px 6px ${tokens.lightShadow}`
      : `3px 3px 6px ${tokens.darkShadow}, -3px -3px 6px ${tokens.lightShadow}`;

    const thumbShadow = `2px 2px 4px ${tokens.darkShadow}, -2px -2px 4px ${tokens.lightShadow}`;

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <motion.button
          ref={ref}
          role="switch"
          type="button"
          aria-checked={isChecked}
          aria-label={ariaProps["aria-label"]}
          disabled={disabled}
          onClick={handleToggle}
          onFocus={(e) => {
            if (e.target.matches(":focus-visible")) setIsFocusVisible(true);
          }}
          onBlur={() => setIsFocusVisible(false)}
          style={{
            width: 52,
            height: 28,
            borderRadius: 14,
            background: isChecked ? accentColor : tokens.background,
            boxShadow: trackShadow,
            border: tokens.outline,
            padding: 2,
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
            outline: "none",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: tokens.background,
              boxShadow: thumbShadow,
            }}
            animate={{ x: isChecked ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.button>
        <FocusRing visible={isFocusVisible} borderRadius={14} />
      </div>
    );
  }
);
