import React, { forwardRef } from "react";
import { useAuraform } from "./AuraformProvider";

export interface SoftDividerProps {
  /** Direction of the divider */
  orientation?: "horizontal" | "vertical";
  /** Length of the divider (CSS value). Defaults to 100% */
  length?: string | number;
  /** Spacing around the divider (px) */
  spacing?: number;
}

/**
 * Neumorphic divider using a subtle inset groove effect
 * rather than a flat border. Purely decorative.
 */
export const SoftDivider = forwardRef<HTMLHRElement, SoftDividerProps>(
  function SoftDivider(
    { orientation = "horizontal", length = "100%", spacing = 12 },
    ref
  ) {
    const { tokens } = useAuraform();

    const isHorizontal = orientation === "horizontal";

    const grooveShadow = isHorizontal
      ? `inset 0 1px 1px ${tokens.darkShadow}, 0 1px 0 ${tokens.lightShadow}`
      : `inset 1px 0 1px ${tokens.darkShadow}, 1px 0 0 ${tokens.lightShadow}`;

    return (
      <hr
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        style={{
          border: "none",
          margin: isHorizontal ? `${spacing}px 0` : `0 ${spacing}px`,
          width: isHorizontal ? length : 1,
          height: isHorizontal ? 1 : length,
          background: "transparent",
          boxShadow: grooveShadow,
          flexShrink: 0,
          display: isHorizontal ? "block" : "inline-block",
        }}
      />
    );
  }
);
