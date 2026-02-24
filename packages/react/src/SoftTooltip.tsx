import React, { useState, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuraform } from "./AuraformProvider";

export interface SoftTooltipProps {
  /** Tooltip text content */
  content: string;
  /** Placement relative to trigger */
  placement?: "top" | "bottom" | "left" | "right";
  /** Delay before showing (ms) */
  delay?: number;
  /** Tooltip offset from trigger (px) */
  offset?: number;
  /** Trigger element */
  children: React.ReactElement;
}

/**
 * Neumorphic tooltip that appears on hover/focus.
 * Uses extruded shadow styling and proper ARIA linking.
 */
export function SoftTooltip({
  content,
  placement = "top",
  delay = 200,
  offset = 8,
  children,
}: SoftTooltipProps) {
  const { tokens } = useAuraform();
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tooltipId = useId();

  const show = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const extrudedShadow = `3px 3px 6px ${tokens.darkShadow}, -3px -3px 6px ${tokens.lightShadow}`;

  const placementStyles: Record<string, React.CSSProperties> = {
    top: {
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      marginBottom: offset,
    },
    bottom: {
      top: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      marginTop: offset,
    },
    left: {
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      marginRight: offset,
    },
    right: {
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      marginLeft: offset,
    },
  };

  const animateDirection = {
    top: { y: 4 },
    bottom: { y: -4 },
    left: { x: 4 },
    right: { x: -4 },
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {React.cloneElement(
        children,
        { "aria-describedby": isVisible ? tooltipId : undefined } as React.HTMLAttributes<HTMLElement>
      )}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, ...animateDirection[placement] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...animateDirection[placement] }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              ...placementStyles[placement],
              background: tokens.background,
              boxShadow: extrudedShadow,
              border: tokens.outline,
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 13,
              fontWeight: 400,
              whiteSpace: "nowrap",
              zIndex: 1000,
              pointerEvents: "none",
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
