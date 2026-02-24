import React, { forwardRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ELEVATION_MAP, type Elevation } from "@auraform/core";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftIconButtonProps
  extends Omit<HTMLMotionProps<"button">, "style" | "aria-label"> {
  /** Accessible label (required for icon-only buttons) */
  "aria-label": string;
  /** Elevation level */
  elevation?: Elevation;
  /** Button shape */
  shape?: "circle" | "square";
  /** Size in pixels */
  size?: number;
  /** Border radius (only for square shape) */
  borderRadius?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Icon content */
  children: React.ReactNode;
}

/**
 * Icon-only neumorphic button.
 * Requires aria-label for accessibility (enforced via TypeScript).
 * Same tactile press animation as SoftButton.
 */
export const SoftIconButton = forwardRef<HTMLButtonElement, SoftIconButtonProps>(
  function SoftIconButton(
    {
      elevation = "medium",
      shape = "circle",
      size = 44,
      borderRadius = 10,
      disabled = false,
      style,
      children,
      ...motionProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [isFocusVisible, setIsFocusVisible] = useState(false);

    const { distance, blur } = ELEVATION_MAP[elevation];
    const resolvedRadius = shape === "circle" ? size / 2 : borderRadius;

    const extrudedShadow = `${distance}px ${distance}px ${blur}px ${tokens.darkShadow}, -${distance}px -${distance}px ${blur}px ${tokens.lightShadow}`;

    const pressedShadow = `inset ${Math.ceil(distance * 0.5)}px ${Math.ceil(distance * 0.5)}px ${Math.ceil(blur * 0.5)}px ${tokens.darkShadow}, inset -${Math.ceil(distance * 0.5)}px -${Math.ceil(distance * 0.5)}px ${Math.ceil(blur * 0.5)}px ${tokens.lightShadow}`;

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <motion.button
          ref={ref}
          type="button"
          disabled={disabled}
          style={{
            width: size,
            height: size,
            borderRadius: resolvedRadius,
            background: tokens.background,
            boxShadow: extrudedShadow,
            border: tokens.outline,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
            padding: 0,
            color: "inherit",
            fontSize: size * 0.45,
            outline: "none",
            ...style,
          }}
          whileHover={!disabled ? { scale: 1.05 } : undefined}
          whileTap={
            !disabled
              ? { boxShadow: pressedShadow, scale: 0.95 }
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
        <FocusRing visible={isFocusVisible} borderRadius={resolvedRadius} />
      </div>
    );
  }
);
