import React, { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SoftBadgeProps {
  /** Content to overlay the badge on */
  children: React.ReactNode;
  /** Badge count (0 hides the badge) */
  count?: number;
  /** Maximum count to display (shows "99+" style) */
  max?: number;
  /** Show as a small dot instead of a count */
  dot?: boolean;
  /** Badge color */
  color?: string;
  /** Accessible description for the badge */
  "aria-label"?: string;
}

/**
 * Overlay badge component for notification counts.
 * Renders a positioned circle/pill on a child element.
 */
export const SoftBadge = forwardRef<HTMLDivElement, SoftBadgeProps>(
  function SoftBadge(
    {
      children,
      count = 0,
      max = 99,
      dot = false,
      color = "#E74C3C",
      ...ariaProps
    },
    ref
  ) {
    const showBadge = dot || count > 0;
    const displayText = dot ? "" : count > max ? `${max}+` : `${count}`;
    const badgeLabel =
      ariaProps["aria-label"] ??
      (dot ? "New notification" : `${count} notification${count !== 1 ? "s" : ""}`);

    return (
      <div
        ref={ref}
        style={{ position: "relative", display: "inline-flex" }}
      >
        {children}

        <AnimatePresence>
          {showBadge && (
            <motion.span
              role="status"
              aria-label={badgeLabel}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              style={{
                position: "absolute",
                top: dot ? -2 : -6,
                right: dot ? -2 : -6,
                minWidth: dot ? 10 : 20,
                height: dot ? 10 : 20,
                borderRadius: 10,
                background: color,
                color: "white",
                fontSize: 11,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: dot ? 0 : "0 6px",
                boxShadow: `1px 1px 3px rgba(0,0,0,0.25)`,
                lineHeight: 1,
                pointerEvents: "none",
              }}
            >
              {!dot && displayText}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
