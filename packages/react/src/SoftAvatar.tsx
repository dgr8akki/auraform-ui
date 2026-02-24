import React, { forwardRef, useState } from "react";
import { useAuraform } from "./AuraformProvider";

export interface SoftAvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback text (initials) when no image is provided or image fails */
  fallback?: string;
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Shape of the avatar */
  shape?: "circle" | "rounded";
  /** Accessible label */
  "aria-label"?: string;
}

const SIZE_MAP = {
  sm: 32,
  md: 44,
  lg: 64,
} as const;

/**
 * Neumorphic avatar component.
 * Displays an image or fallback initials with extruded shadow styling.
 */
export const SoftAvatar = forwardRef<HTMLDivElement, SoftAvatarProps>(
  function SoftAvatar(
    {
      src,
      alt,
      fallback = "?",
      size = "md",
      shape = "circle",
      ...ariaProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [imgError, setImgError] = useState(false);

    const px = SIZE_MAP[size];
    const borderRadius = shape === "circle" ? px / 2 : px * 0.2;
    const extrudedShadow = `3px 3px 6px ${tokens.darkShadow}, -3px -3px 6px ${tokens.lightShadow}`;

    const showFallback = !src || imgError;

    return (
      <div
        ref={ref}
        role="img"
        aria-label={ariaProps["aria-label"] ?? alt ?? fallback}
        style={{
          width: px,
          height: px,
          borderRadius,
          background: tokens.background,
          boxShadow: extrudedShadow,
          border: tokens.outline,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {showFallback ? (
          <span
            aria-hidden="true"
            style={{
              fontSize: px * 0.38,
              fontWeight: 600,
              color: "inherit",
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >
            {fallback.slice(0, 2)}
          </span>
        ) : (
          <img
            src={src}
            alt={alt ?? ""}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    );
  }
);
