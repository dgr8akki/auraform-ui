import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";

export interface SoftGaugeSegment {
  /** Threshold value where this segment ends */
  until: number;
  /** Color for this segment */
  color: string;
}

export interface SoftGaugeProps {
  /** Current value */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Label displayed below the value */
  label?: string;
  /** Unit suffix displayed after the value (e.g. "%" or "°C") */
  unit?: string;
  /** Diameter of the gauge */
  size?: number;
  /** Default accent color (used when no segments match) */
  accentColor?: string;
  /** Color segments for different value ranges */
  segments?: SoftGaugeSegment[];
  /** Accessible label */
  "aria-label"?: string;
}

/** Gauge sweeps 180° from left (180°) to right (0°) */
const START_ANGLE_DEG = 180;
const ARC_SWEEP_DEG = 180;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngleDeg: number,
  sweepDeg: number
): string {
  const endAngleDeg = startAngleDeg - sweepDeg;
  const start = polarToCartesian(cx, cy, r, startAngleDeg);
  const end = polarToCartesian(cx, cy, r, endAngleDeg);
  const largeArc = sweepDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

/**
 * Neumorphic semicircular gauge/meter.
 * Read-only display with an arc fill, optional needle, and value label.
 * Supports colored segments for visual breakpoints.
 */
export const SoftGauge = forwardRef<HTMLDivElement, SoftGaugeProps>(
  function SoftGauge(
    {
      value,
      min = 0,
      max = 100,
      label,
      unit = "",
      size = 160,
      accentColor = "#4A90D9",
      segments,
      ...ariaProps
    },
    ref
  ) {
    const { tokens } = useAuraform();

    const clamped = Math.min(max, Math.max(min, value));
    const ratio = (clamped - min) / (max - min);
    const sweepDeg = ratio * ARC_SWEEP_DEG;

    // Determine fill color from segments
    let fillColor = accentColor;
    if (segments && segments.length > 0) {
      for (const seg of segments) {
        if (clamped <= seg.until) {
          fillColor = seg.color;
          break;
        }
        fillColor = seg.color; // use last segment if value exceeds all
      }
    }

    const half = size / 2;
    const shadowPad = 12; // room for extruded shadow above the semicircle
    const gaugeHeight = half + shadowPad + 32; // semicircle + shadow pad + label
    const trackRadius = half - 12;
    const trackWidth = 8;

    const extrudedShadow = `4px 4px 8px ${tokens.darkShadow}, -4px -4px 8px ${tokens.lightShadow}`;
    const insetShadow = `inset 2px 2px 4px ${tokens.darkShadow}, inset -2px -2px 4px ${tokens.lightShadow}`;

    // Needle
    const needleAngleDeg = START_ANGLE_DEG - sweepDeg;
    const needleLength = trackRadius - 10;
    const needleTip = polarToCartesian(half, half, needleLength, needleAngleDeg);

    return (
      <div
        ref={ref}
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaProps["aria-label"] ?? label}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          width: size,
        }}
      >
        <div
          style={{
            position: "relative",
            width: size,
            height: half + shadowPad + 4,
            paddingTop: shadowPad,
            overflow: "hidden",
          }}
        >
          {/* Outer extruded ring (semicircle) */}
          <div
            aria-hidden="true"
            style={{
              width: size,
              height: size,
              borderRadius: half,
              background: tokens.background,
              boxShadow: extrudedShadow,
              border: tokens.outline,
              position: "absolute",
              top: shadowPad,
              left: 0,
            }}
          />

          {/* Inner inset well */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: shadowPad + 8,
              left: 8,
              width: size - 16,
              height: size - 16,
              borderRadius: (size - 16) / 2,
              boxShadow: insetShadow,
            }}
          />

          {/* SVG arc */}
          <svg
            width={size}
            height={half + shadowPad + 4}
            style={{ position: "absolute", top: 0, left: 0 }}
            aria-hidden="true"
          >
            {/* Background track */}
            <path
              d={describeArc(half, half + shadowPad, trackRadius, START_ANGLE_DEG, ARC_SWEEP_DEG)}
              fill="none"
              stroke={tokens.darkShadow}
              strokeWidth={trackWidth}
              strokeLinecap="round"
              opacity={0.2}
            />
            {/* Filled arc */}
            {sweepDeg > 0 && (
              <motion.path
                d={describeArc(half, half + shadowPad, trackRadius, START_ANGLE_DEG, sweepDeg)}
                fill="none"
                stroke={fillColor}
                strokeWidth={trackWidth}
                strokeLinecap="round"
                initial={false}
                animate={{ d: describeArc(half, half + shadowPad, trackRadius, START_ANGLE_DEG, sweepDeg) }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}
            {/* Needle */}
            <motion.line
              x1={half}
              y1={half + shadowPad}
              x2={needleTip.x}
              y2={needleTip.y + shadowPad}
              stroke={fillColor}
              strokeWidth={2}
              strokeLinecap="round"
              initial={false}
              animate={{ x2: needleTip.x, y2: needleTip.y + shadowPad }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Center hub */}
            <circle
              cx={half}
              cy={half + shadowPad}
              r={6}
              fill={tokens.background}
              stroke={fillColor}
              strokeWidth={2}
            />
          </svg>
        </div>

        {/* Value + label */}
        <div
          style={{
            textAlign: "center",
            marginTop: 4,
          }}
        >
          <div
            style={{
              fontSize: size * 0.16,
              fontWeight: 700,
              color: tokens.textColor,
              lineHeight: 1.2,
            }}
          >
            {Math.round(clamped)}
            {unit && (
              <span style={{ fontSize: "0.7em", fontWeight: 400 }}>{unit}</span>
            )}
          </div>
          {label && (
            <div
              style={{
                fontSize: size * 0.1,
                color: tokens.textSecondary,
                marginTop: 2,
              }}
            >
              {label}
            </div>
          )}
        </div>
      </div>
    );
  }
);
