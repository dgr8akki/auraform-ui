import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

/* ------------------------------------------------------------------ */
/*  RadioGroup Context                                                 */
/* ------------------------------------------------------------------ */

interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  onChange: (value: string) => void;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error("SoftRadio must be used within a <SoftRadioGroup>");
  }
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  SoftRadioGroup                                                     */
/* ------------------------------------------------------------------ */

export interface SoftRadioGroupProps {
  /** Group name for form submission */
  name: string;
  /** Currently selected value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Disable all radios in the group */
  disabled?: boolean;
  /** Accessible label for the group */
  "aria-label"?: string;
  /** Accessible labelledby for the group */
  "aria-labelledby"?: string;
  children: React.ReactNode;
}

/**
 * Container for SoftRadio buttons.
 * Manages group state and provides arrow-key navigation.
 */
export const SoftRadioGroup = forwardRef<HTMLDivElement, SoftRadioGroupProps>(
  function SoftRadioGroup(
    {
      name,
      value: controlledValue,
      defaultValue,
      onChange,
      disabled = false,
      children,
      ...ariaProps
    },
    ref
  ) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const groupRef = useRef<HTMLDivElement>(null);

    const currentValue = controlledValue ?? internalValue;

    const handleChange = useCallback(
      (val: string) => {
        if (controlledValue === undefined) {
          setInternalValue(val);
        }
        onChange?.(val);
      },
      [controlledValue, onChange]
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const radios = groupRef.current?.querySelectorAll<HTMLElement>(
        '[role="radio"]:not([aria-disabled="true"])'
      );
      if (!radios || radios.length === 0) return;

      const items = Array.from(radios);
      const currentIndex = items.findIndex(
        (el) => el === document.activeElement
      );
      let nextIndex = -1;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % items.length;
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + items.length) % items.length;
      }

      if (nextIndex >= 0) {
        items[nextIndex].focus();
        const val = items[nextIndex].getAttribute("data-value");
        if (val) handleChange(val);
      }
    };

    return (
      <RadioGroupContext.Provider
        value={{ name, value: currentValue, onChange: handleChange, disabled }}
      >
        <div
          ref={(node) => {
            (groupRef as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          role="radiogroup"
          aria-label={ariaProps["aria-label"]}
          aria-labelledby={ariaProps["aria-labelledby"]}
          onKeyDown={handleKeyDown}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

/* ------------------------------------------------------------------ */
/*  SoftRadio                                                          */
/* ------------------------------------------------------------------ */

export interface SoftRadioProps {
  /** Value for this radio option */
  value: string;
  /** Label text */
  label?: string;
  /** Override disabled for this specific radio */
  disabled?: boolean;
  /** Accent color when selected */
  accentColor?: string;
}

/**
 * Individual neumorphic radio button.
 * Must be used within a SoftRadioGroup.
 */
export const SoftRadio = forwardRef<HTMLDivElement, SoftRadioProps>(
  function SoftRadio(
    { value, label, disabled: localDisabled, accentColor = "#4A90D9" },
    ref
  ) {
    const { tokens } = useAuraform();
    const group = useRadioGroup();
    const [isFocusVisible, setIsFocusVisible] = useState(false);

    const isDisabled = localDisabled ?? group.disabled;
    const isSelected = group.value === value;

    const extrudedShadow = `3px 3px 6px ${tokens.darkShadow}, -3px -3px 6px ${tokens.lightShadow}`;
    const insetShadow = `inset 2px 2px 4px ${tokens.darkShadow}, inset -2px -2px 4px ${tokens.lightShadow}`;

    const handleSelect = () => {
      if (!isDisabled) group.onChange(value);
    };

    return (
      <div
        ref={ref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          cursor: isDisabled ? "not-allowed" : "pointer",
          opacity: isDisabled ? 0.6 : 1,
        }}
        onClick={handleSelect}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <motion.div
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            data-value={value}
            tabIndex={isSelected || (!group.value && value === "") ? 0 : -1}
            onFocus={(e) => {
              if ((e.target as HTMLElement).matches(":focus-visible"))
                setIsFocusVisible(true);
            }}
            onBlur={() => setIsFocusVisible(false)}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
                handleSelect();
              }
            }}
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              background: tokens.background,
              boxShadow: isSelected ? insetShadow : extrudedShadow,
              border: tokens.outline,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: "none",
            }}
            animate={{
              boxShadow: isSelected ? insetShadow : extrudedShadow,
            }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            {/* Inner dot for selected state (dual-signaling) */}
            <motion.div
              aria-hidden="true"
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: accentColor,
              }}
              animate={{
                scale: isSelected ? 1 : 0,
                opacity: isSelected ? 1 : 0,
              }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
            />
          </motion.div>
          <FocusRing visible={isFocusVisible} borderRadius={12} />
        </div>

        {label && (
          <span
            style={{
              cursor: isDisabled ? "not-allowed" : "pointer",
              userSelect: "none",
            }}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);
