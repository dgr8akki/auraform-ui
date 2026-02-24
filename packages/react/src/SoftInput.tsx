import React, { forwardRef, useState } from "react";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  /** Border radius */
  borderRadius?: number;
  /** Accent color for the bottom border (high-contrast indicator) */
  accentColor?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Neumorphic input field with inset shadows and a persistent
 * high-contrast bottom border for accessibility.
 */
export const SoftInput = forwardRef<HTMLInputElement, SoftInputProps>(
  function SoftInput(
    { borderRadius = 12, accentColor = "#4A90D9", style, ...inputProps },
    ref
  ) {
    const { tokens } = useAuraform();
    const [isFocused, setIsFocused] = useState(false);

    const insetShadow = `inset 4px 4px 8px ${tokens.darkShadow}, inset -4px -4px 8px ${tokens.lightShadow}`;

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <input
          ref={ref}
          style={{
            background: tokens.background,
            boxShadow: insetShadow,
            border: tokens.outline,
            borderBottom: `2px solid ${isFocused ? accentColor : "rgba(0, 0, 0, 0.15)"}`,
            borderRadius,
            padding: "12px 16px",
            fontSize: "inherit",
            fontFamily: "inherit",
            color: "inherit",
            outline: "none",
            transition: "border-color 0.2s ease",
            width: "100%",
            ...style,
          }}
          onFocus={(e) => {
            setIsFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            inputProps.onBlur?.(e);
          }}
          {...inputProps}
        />
        <FocusRing visible={isFocused} borderRadius={borderRadius} />
      </div>
    );
  }
);
