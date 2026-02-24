import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";

export interface SoftProgressProps {
  /** Progress value (0-100). Omit for indeterminate mode. */
  value?: number;
  /** Visual variant */
  variant?: "linear" | "circular";
  /** Accent color for the filled portion */
  accentColor?: string;
  /** Width for linear / diameter for circular (in px) */
  size?: number;
  /** Track thickness in pixels */
  thickness?: number;
  /** Show percentage label */
  showLabel?: boolean;
  /** Accessible label */
  "aria-label"?: string;
}

/**
 * Neumorphic progress indicator.
 * Linear: inset track with accent fill bar.
 * Circular: SVG ring with stroke-dasharray.
 * Supports determinate (value) and indeterminate (animated) modes.
 */
export const SoftProgress = forwardRef<HTMLDivElement, SoftProgressProps>(
  function SoftProgress(
    {
      value,
      variant = "linear",
      accentColor = "#4A90D9",
      size = variant === "linear" ? 200 : 48,
      thickness = variant === "linear" ? 8 : 4,
      showLabel = false,
      ...ariaProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const isDeterminate = value !== undefined;
    const clampedValue = isDeterminate
      ? Math.min(100, Math.max(0, value))
      : 0;

    if (variant === "circular") {
      const radius = (size - thickness) / 2;
      const circumference = 2 * Math.PI * radius;
      const offset = isDeterminate
        ? circumference - (clampedValue / 100) * circumference
        : circumference * 0.75;

      return (
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={isDeterminate ? clampedValue : undefined}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={ariaProps["aria-label"]}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: size,
            height: size,
          }}
        >
          <svg
            width={size}
            height={size}
            style={{
              transform: "rotate(-90deg)",
            }}
          >
            {/* Background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={tokens.darkShadow}
              strokeWidth={thickness}
              opacity={0.3}
            />
            {/* Filled arc */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={accentColor}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={
                isDeterminate
                  ? { strokeDashoffset: offset }
                  : { rotate: 360 }
              }
              transition={
                isDeterminate
                  ? { duration: 0.3, ease: "easeInOut" }
                  : { duration: 1.2, ease: "linear", repeat: Infinity }
              }
              style={{
                strokeDashoffset: isDeterminate ? undefined : offset,
                transformOrigin: "center",
              }}
            />
          </svg>
          {showLabel && isDeterminate && (
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                fontSize: size * 0.24,
                fontWeight: 600,
                color: "inherit",
              }}
            >
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      );
    }

    // Linear variant
    const insetShadow = `inset 2px 2px 4px ${tokens.darkShadow}, inset -2px -2px 4px ${tokens.lightShadow}`;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={isDeterminate ? clampedValue : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaProps["aria-label"]}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          width: size,
        }}
      >
        <div
          style={{
            flex: 1,
            height: thickness,
            borderRadius: thickness / 2,
            background: tokens.background,
            boxShadow: insetShadow,
            border: tokens.outline,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <motion.div
            aria-hidden="true"
            style={{
              height: "100%",
              borderRadius: thickness / 2,
              background: accentColor,
            }}
            animate={
              isDeterminate
                ? { width: `${clampedValue}%` }
                : { x: ["-100%", "200%"] }
            }
            transition={
              isDeterminate
                ? { duration: 0.3, ease: "easeInOut" }
                : { duration: 1.5, ease: "easeInOut", repeat: Infinity }
            }
            {...(!isDeterminate && { style: { height: "100%", width: "40%", borderRadius: thickness / 2, background: accentColor, position: "absolute" as const } })}
          />
        </div>
        {showLabel && isDeterminate && (
          <span
            aria-hidden="true"
            style={{ fontSize: 12, fontWeight: 600, minWidth: 32, textAlign: "right" }}
          >
            {Math.round(clampedValue)}%
          </span>
        )}
      </div>
    );
  }
);
