import React, { forwardRef, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SegmentOption {
  /** Unique value for this segment */
  value: string;
  /** Display label */
  label: string;
}

export interface SoftSegmentedControlProps {
  /** Segment options */
  options: SegmentOption[];
  /** Currently selected value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Accent color for the active segment text */
  accentColor?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Accessible label */
  "aria-label"?: string;
}

/**
 * Neumorphic segmented control (iOS-style toggle).
 * Inset container with a sliding extruded active segment.
 * Uses Framer Motion layoutId for smooth sliding animation.
 */
export const SoftSegmentedControl = forwardRef<HTMLDivElement, SoftSegmentedControlProps>(
  function SoftSegmentedControl(
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      accentColor = "#4A90D9",
      disabled = false,
      ...ariaProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [internalValue, setInternalValue] = useState(
      defaultValue ?? options[0]?.value ?? ""
    );
    const [focusedValue, setFocusedValue] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentValue = controlledValue ?? internalValue;

    const handleSelect = (val: string) => {
      if (disabled) return;
      if (controlledValue === undefined) {
        setInternalValue(val);
      }
      onChange?.(val);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      const currentIndex = options.findIndex((o) => o.value === currentValue);
      let nextIndex = -1;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % options.length;
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + options.length) % options.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = options.length - 1;
      }

      if (nextIndex >= 0) {
        const nextOption = options[nextIndex];
        handleSelect(nextOption.value);
        // Focus the next segment button
        const buttons = containerRef.current?.querySelectorAll<HTMLElement>(
          '[role="radio"]'
        );
        buttons?.[nextIndex]?.focus();
      }
    };

    const insetShadow = `inset 2px 2px 5px ${tokens.darkShadow}, inset -2px -2px 5px ${tokens.lightShadow}`;
    const extrudedShadow = `2px 2px 4px ${tokens.darkShadow}, -2px -2px 4px ${tokens.lightShadow}`;

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="radiogroup"
        aria-label={ariaProps["aria-label"]}
        onKeyDown={handleKeyDown}
        style={{
          display: "inline-flex",
          gap: 2,
          padding: 4,
          borderRadius: 12,
          background: tokens.background,
          boxShadow: insetShadow,
          border: tokens.outline,
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {options.map((option) => {
          const isActive = currentValue === option.value;
          const isFocused = focusedValue === option.value;

          return (
            <div
              key={option.value}
              style={{ position: "relative", display: "inline-block" }}
            >
              <motion.button
                type="button"
                role="radio"
                aria-checked={isActive}
                tabIndex={isActive ? 0 : -1}
                disabled={disabled}
                onClick={() => handleSelect(option.value)}
                onFocus={(e) => {
                  if (e.target.matches(":focus-visible"))
                    setFocusedValue(option.value);
                }}
                onBlur={() => setFocusedValue(null)}
                style={{
                  position: "relative",
                  padding: "8px 20px",
                  borderRadius: 8,
                  border: "none",
                  background: "transparent",
                  color: isActive ? accentColor : tokens.textSecondary,
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "inherit",
                  fontFamily: "inherit",
                  cursor: disabled ? "not-allowed" : "pointer",
                  outline: "none",
                  zIndex: 1,
                }}
                transition={{ duration: 0.15 }}
              >
                {/* Animated active background */}
                {isActive && (
                  <motion.div
                    layoutId="segmented-active"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 8,
                      background: tokens.background,
                      boxShadow: extrudedShadow,
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {option.label}
              </motion.button>
              <FocusRing visible={isFocused ?? false} borderRadius={8} />
            </div>
          );
        })}
      </div>
    );
  }
);
