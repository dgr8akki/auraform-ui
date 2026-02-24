import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftRatingProps {
  /** Current rating value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Number of stars */
  max?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Size of each star in pixels */
  size?: number;
  /** Accent color for filled stars */
  accentColor?: string;
  /** Read-only mode (no interaction) */
  readOnly?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Accessible label */
  "aria-label"?: string;
}

/** SVG star path scaled to a 24x24 viewbox */
const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

/**
 * Neumorphic star rating.
 * Each star toggles between extruded (empty) and inset + filled (selected).
 * Supports hover preview, keyboard navigation, and ARIA radiogroup pattern.
 */
export const SoftRating = forwardRef<HTMLDivElement, SoftRatingProps>(
  function SoftRating(
    {
      value: controlledValue,
      defaultValue = 0,
      max = 5,
      onChange,
      size = 32,
      accentColor = "#F5A623",
      readOnly = false,
      disabled = false,
      ...ariaProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const currentValue = controlledValue ?? internalValue;
    const displayValue = hoverValue ?? currentValue;
    const isInteractive = !readOnly && !disabled;

    const updateValue = (val: number) => {
      if (!isInteractive) return;
      if (controlledValue === undefined) {
        setInternalValue(val);
      }
      onChange?.(val);
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (!isInteractive) return;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(max, index + 2);
        updateValue(next);
        // Focus next star
        const nextStar = (e.currentTarget as HTMLElement)
          .parentElement?.parentElement?.querySelector<HTMLElement>(
            `[data-star="${next - 1}"]`
          );
        nextStar?.focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.max(1, index);
        updateValue(next);
        const prevStar = (e.currentTarget as HTMLElement)
          .parentElement?.parentElement?.querySelector<HTMLElement>(
            `[data-star="${next - 1}"]`
          );
        prevStar?.focus();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        updateValue(index + 1);
      }
    };

    const extrudedShadow = `2px 2px 4px ${tokens.darkShadow}, -2px -2px 4px ${tokens.lightShadow}`;

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={ariaProps["aria-label"] ?? "Rating"}
        style={{
          display: "inline-flex",
          gap: 4,
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {Array.from({ length: max }, (_, i) => {
          const starNumber = i + 1;
          const isFilled = starNumber <= displayValue;
          const isActive = starNumber <= currentValue;
          const isFocused = focusedIndex === i;

          return (
            <div
              key={i}
              style={{ position: "relative", display: "inline-block" }}
            >
              <motion.div
                role="radio"
                aria-checked={isActive}
                aria-label={`${starNumber} star${starNumber !== 1 ? "s" : ""}`}
                tabIndex={
                  !isInteractive
                    ? -1
                    : isActive || (currentValue === 0 && i === 0)
                      ? 0
                      : -1
                }
                data-star={i}
                onClick={() => updateValue(starNumber)}
                onMouseEnter={() => isInteractive && setHoverValue(starNumber)}
                onMouseLeave={() => isInteractive && setHoverValue(null)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onFocus={(e) => {
                  if ((e.target as HTMLElement).matches(":focus-visible"))
                    setFocusedIndex(i);
                }}
                onBlur={() => setFocusedIndex(null)}
                style={{
                  width: size,
                  height: size,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 6,
                  cursor: isInteractive ? "pointer" : "default",
                  outline: "none",
                  filter: isFilled ? `drop-shadow(0 0 2px ${accentColor}40)` : undefined,
                }}
                whileHover={isInteractive ? { scale: 1.15 } : undefined}
                whileTap={isInteractive ? { scale: 0.9 } : undefined}
                transition={{ duration: 0.12 }}
              >
                <svg
                  width={size * 0.75}
                  height={size * 0.75}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d={STAR_PATH}
                    fill={isFilled ? accentColor : "none"}
                    stroke={isFilled ? accentColor : tokens.textSecondary}
                    strokeWidth={1.5}
                    strokeLinejoin="round"
                    style={{
                      filter: isFilled
                        ? undefined
                        : `drop-shadow(1px 1px 1px ${tokens.darkShadow})`,
                    }}
                  />
                </svg>
              </motion.div>
              <FocusRing visible={isFocused ?? false} borderRadius={6} />
            </div>
          );
        })}
      </div>
    );
  }
);
