import React, { forwardRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ELEVATION_MAP, type Elevation } from "@auraform/core";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SurfaceProps
  extends Omit<HTMLMotionProps<"div">, "style"> {
  /** Elevation level controlling shadow depth */
  elevation?: Elevation;
  /** Whether the surface appears inset (pressed) */
  isInset?: boolean;
  /** Border radius in pixels */
  borderRadius?: number;
  /** Additional inline styles */
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * The base neumorphic building block.
 * Handles background color, shadow rendering, adaptive borders,
 * and focus ring display.
 */
export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  function Surface(
    {
      elevation = "medium",
      isInset = false,
      borderRadius = 12,
      style,
      children,
      ...motionProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [isFocused, setIsFocused] = useState(false);

    const { distance, blur } = ELEVATION_MAP[elevation];

    const shadowValue = isInset
      ? `inset ${distance}px ${distance}px ${blur}px ${tokens.darkShadow}, inset -${distance}px -${distance}px ${blur}px ${tokens.lightShadow}`
      : `${distance}px ${distance}px ${blur}px ${tokens.darkShadow}, -${distance}px -${distance}px ${blur}px ${tokens.lightShadow}`;

    const pressedShadow = `inset ${Math.ceil(distance * 0.6)}px ${Math.ceil(distance * 0.6)}px ${Math.ceil(blur * 0.6)}px ${tokens.darkShadow}, inset -${Math.ceil(distance * 0.6)}px -${Math.ceil(distance * 0.6)}px ${Math.ceil(blur * 0.6)}px ${tokens.lightShadow}`;

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <motion.div
          ref={ref}
          style={{
            background: tokens.background,
            boxShadow: shadowValue,
            border: tokens.outline,
            borderRadius,
            padding: 16,
            ...style,
          }}
          whileTap={
            elevation !== "flat" ? { boxShadow: pressedShadow } : undefined
          }
          transition={{ duration: 0.15, ease: "easeInOut" }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          tabIndex={0}
          {...motionProps}
        >
          {children}
        </motion.div>
        <FocusRing visible={isFocused} borderRadius={borderRadius} />
      </div>
    );
  }
);
