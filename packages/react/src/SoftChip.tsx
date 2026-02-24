import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftChipProps {
  /** Chip label text */
  label: string;
  /** Whether the chip is selected (controlled) */
  selected?: boolean;
  /** Default selected state (uncontrolled, only if selectable) */
  defaultSelected?: boolean;
  /** Enable toggle selection behavior */
  selectable?: boolean;
  /** Selection change handler */
  onSelect?: (selected: boolean) => void;
  /** Show remove icon and enable removal */
  removable?: boolean;
  /** Remove handler */
  onRemove?: () => void;
  /** Accent color for selected state */
  accentColor?: string;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Neumorphic chip/tag component.
 * Supports selectable (toggle inset/extruded) and removable (X icon) modes.
 */
export const SoftChip = forwardRef<HTMLDivElement, SoftChipProps>(
  function SoftChip(
    {
      label,
      selected: controlledSelected,
      defaultSelected = false,
      selectable = false,
      onSelect,
      removable = false,
      onRemove,
      accentColor = "#4A90D9",
      disabled = false,
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [internalSelected, setInternalSelected] = useState(defaultSelected);
    const [isFocusVisible, setIsFocusVisible] = useState(false);

    const isSelected = selectable
      ? (controlledSelected ?? internalSelected)
      : false;

    const extrudedShadow = `2px 2px 4px ${tokens.darkShadow}, -2px -2px 4px ${tokens.lightShadow}`;
    const insetShadow = `inset 2px 2px 4px ${tokens.darkShadow}, inset -2px -2px 4px ${tokens.lightShadow}`;

    const handleClick = () => {
      if (disabled || !selectable) return;
      const next = !isSelected;
      if (controlledSelected === undefined) {
        setInternalSelected(next);
      }
      onSelect?.(next);
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled) onRemove?.();
    };

    const isInteractive = selectable || removable;

    return (
      <div
        ref={ref}
        style={{ position: "relative", display: "inline-block" }}
      >
        <motion.div
          role={selectable ? "option" : undefined}
          aria-selected={selectable ? isSelected : undefined}
          aria-disabled={disabled || undefined}
          tabIndex={isInteractive && !disabled ? 0 : undefined}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
          onFocus={(e) => {
            if ((e.target as HTMLElement).matches(":focus-visible"))
              setIsFocusVisible(true);
          }}
          onBlur={() => setIsFocusVisible(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: 20,
            background: isSelected ? accentColor : tokens.background,
            boxShadow: isSelected ? insetShadow : extrudedShadow,
            border: tokens.outline,
            fontSize: 13,
            fontWeight: 500,
            color: isSelected ? "white" : "inherit",
            cursor: disabled ? "not-allowed" : isInteractive ? "pointer" : "default",
            opacity: disabled ? 0.6 : 1,
            outline: "none",
            userSelect: "none",
          }}
          whileHover={isInteractive && !disabled ? { scale: 1.03 } : undefined}
          whileTap={isInteractive && !disabled ? { scale: 0.97 } : undefined}
          transition={{ duration: 0.12 }}
        >
          <span>{label}</span>

          {removable && (
            <button
              type="button"
              aria-label={`Remove ${label}`}
              onClick={handleRemove}
              disabled={disabled}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 16,
                height: 16,
                borderRadius: 8,
                border: "none",
                background: isSelected ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.1)",
                cursor: disabled ? "not-allowed" : "pointer",
                padding: 0,
                color: isSelected ? "white" : "inherit",
                fontSize: 10,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          )}
        </motion.div>
        <FocusRing visible={isFocusVisible} borderRadius={20} />
      </div>
    );
  }
);
