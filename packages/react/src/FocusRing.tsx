import React from "react";

export interface FocusRingProps {
  /** Border radius to match the parent component */
  borderRadius?: number;
  /** Color of the focus ring */
  color?: string;
  /** Width of the focus ring */
  width?: number;
  /** Offset from the component edge */
  offset?: number;
  /** Whether the focus ring is visible */
  visible: boolean;
}

/**
 * SVG-based focus ring that follows the neumorphic component shape.
 * Renders as an absolutely positioned overlay.
 */
export function FocusRing({
  borderRadius = 12,
  color = "#4A90D9",
  width = 2,
  offset = 3,
  visible,
}: FocusRingProps) {
  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: -offset,
        borderRadius: borderRadius + offset,
        border: `${width}px solid ${color}`,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
