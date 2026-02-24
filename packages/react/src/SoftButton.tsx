import React, { forwardRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ELEVATION_MAP, type Elevation } from "@auraform/core";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftButtonProps
  extends Omit<HTMLMotionProps<"button">, "style"> {
  /** Elevation level */
  elevation?: Elevation;
  /** Visual variant */
  variant?: "default" | "primary";
  /** Accent color for primary variant (used for dual-signaling) */
  accentColor?: string;
  /** Border radius */
  borderRadius?: number;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Disabled state */
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Neumorphic button with tactile press animation and dual-signaling.
 * Uses both shadow depth AND accent color to indicate active states,
 * ensuring accessibility for color-blind users.
 */
export const SoftButton = forwardRef<HTMLButtonElement, SoftButtonProps>(
  function SoftButton(
    {
      elevation = "medium",
      variant = "default",
      accentColor = "#4A90D9",
      borderRadius = 12,
      style,
      disabled = false,
      children,
      ...motionProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [isFocusVisible, setIsFocusVisible] = useState(false);

    const { distance, blur } = ELEVATION_MAP[elevation];

    const extrudedShadow = `${distance}px ${distance}px ${blur}px ${tokens.darkShadow}, -${distance}px -${distance}px ${blur}px ${tokens.lightShadow}`;

    const pressedShadow = `inset ${Math.ceil(distance * 0.5)}px ${Math.ceil(distance * 0.5)}px ${Math.ceil(blur * 0.5)}px ${tokens.darkShadow}, inset -${Math.ceil(distance * 0.5)}px -${Math.ceil(distance * 0.5)}px ${Math.ceil(blur * 0.5)}px ${tokens.lightShadow}`;

    const isPrimary = variant === "primary";

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <motion.button
          ref={ref}
          type="button"
          disabled={disabled}
          style={{
            background: tokens.background,
            boxShadow: extrudedShadow,
            border: isPrimary
              ? `2px solid ${accentColor}`
              : tokens.outline,
            borderRadius,
            padding: "12px 24px",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
            color: isPrimary ? accentColor : "inherit",
            fontWeight: isPrimary ? 600 : 400,
            fontSize: "inherit",
            fontFamily: "inherit",
            outline: "none",
            ...style,
          }}
          whileHover={!disabled ? { scale: 1.02 } : undefined}
          whileTap={
            !disabled
              ? { boxShadow: pressedShadow, scale: 0.98 }
              : undefined
          }
          transition={{ duration: 0.15, ease: "easeInOut" }}
          onFocus={(e) => {
            if (e.target.matches(":focus-visible")) setIsFocusVisible(true);
          }}
          onBlur={() => setIsFocusVisible(false)}
          aria-disabled={disabled}
          {...motionProps}
        >
          {children}
        </motion.button>
        <FocusRing visible={isFocusVisible} borderRadius={borderRadius} />
      </div>
    );
  }
);
