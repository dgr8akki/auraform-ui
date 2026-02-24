import React, { forwardRef, useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ELEVATION_MAP, type Elevation } from "@auraform/core";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftCardProps
  extends Omit<HTMLMotionProps<"article">, "style"> {
  /** Elevation level controlling shadow depth */
  elevation?: Elevation;
  /** Border radius in pixels */
  borderRadius?: number;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Media element (image/video) rendered at the top */
  media?: React.ReactNode;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Make the card focusable/interactive */
  interactive?: boolean;
  children?: React.ReactNode;
}

/**
 * Semantic neumorphic card built on the Surface pattern.
 * Provides optional header, footer, and media slots for structured layouts.
 */
export const SoftCard = forwardRef<HTMLElement, SoftCardProps>(
  function SoftCard(
    {
      elevation = "medium",
      borderRadius = 16,
      header,
      footer,
      media,
      style,
      interactive = false,
      children,
      ...motionProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [isFocusVisible, setIsFocusVisible] = useState(false);

    const { distance, blur } = ELEVATION_MAP[elevation];

    const shadowValue = `${distance}px ${distance}px ${blur}px ${tokens.darkShadow}, -${distance}px -${distance}px ${blur}px ${tokens.lightShadow}`;

    const pressedShadow = `inset ${Math.ceil(distance * 0.4)}px ${Math.ceil(distance * 0.4)}px ${Math.ceil(blur * 0.4)}px ${tokens.darkShadow}, inset -${Math.ceil(distance * 0.4)}px -${Math.ceil(distance * 0.4)}px ${Math.ceil(blur * 0.4)}px ${tokens.lightShadow}`;

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <motion.article
          ref={ref}
          style={{
            background: tokens.background,
            boxShadow: shadowValue,
            border: tokens.outline,
            borderRadius,
            overflow: "hidden",
            outline: "none",
            ...style,
          }}
          whileHover={interactive ? { scale: 1.01 } : undefined}
          whileTap={interactive ? { boxShadow: pressedShadow } : undefined}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          tabIndex={interactive ? 0 : undefined}
          onFocus={(e) => {
            if (
              interactive &&
              (e.target as HTMLElement).matches(":focus-visible")
            )
              setIsFocusVisible(true);
          }}
          onBlur={() => setIsFocusVisible(false)}
          {...motionProps}
        >
          {/* Media slot (no padding) */}
          {media && (
            <div
              style={{
                overflow: "hidden",
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
              }}
            >
              {media}
            </div>
          )}

          {/* Header */}
          {header && (
            <div
              style={{
                padding: "16px 20px 8px",
                fontWeight: 600,
              }}
            >
              {header}
            </div>
          )}

          {/* Body */}
          <div style={{ padding: header || media ? "8px 20px 16px" : 20 }}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div
              style={{
                padding: "8px 20px 16px",
                borderTop: `1px solid rgba(0, 0, 0, 0.08)`,
              }}
            >
              {footer}
            </div>
          )}
        </motion.article>
        {interactive && (
          <FocusRing visible={isFocusVisible} borderRadius={borderRadius} />
        )}
      </div>
    );
  }
);
