import React, { forwardRef, useState, useRef, useCallback } from "react";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

export interface SoftTextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "style"> {
  /** Border radius */
  borderRadius?: number;
  /** Accent color for the bottom border (high-contrast indicator) */
  accentColor?: string;
  /** Enable auto-resize based on content */
  autoResize?: boolean;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Neumorphic multi-line text input with inset shadows
 * and a persistent high-contrast bottom border.
 */
export const SoftTextArea = forwardRef<HTMLTextAreaElement, SoftTextAreaProps>(
  function SoftTextArea(
    {
      borderRadius = 12,
      accentColor = "#4A90D9",
      autoResize = false,
      style,
      ...textAreaProps
    },
    ref
  ) {
    const { tokens } = useAuraform();
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    const pointerFocusRef = useRef(false);

    const insetShadow = `inset 4px 4px 8px ${tokens.darkShadow}, inset -4px -4px 8px ${tokens.lightShadow}`;

    const handleAutoResize = useCallback(() => {
      if (!autoResize || !internalRef.current) return;
      const el = internalRef.current;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [autoResize]);

    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    return (
      <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
        <textarea
          ref={setRefs}
          style={{
            background: tokens.background,
            boxShadow: insetShadow,
            border: tokens.outline,
            borderBottom: "2px solid rgba(0, 0, 0, 0.12)",
            borderRadius,
            padding: "12px 16px",
            fontSize: "inherit",
            fontFamily: "inherit",
            color: "inherit",
            outline: "none",
            transition: "border-color 0.2s ease",
            width: "100%",
            resize: autoResize ? "none" : undefined,
            overflow: autoResize ? "hidden" : undefined,
            ...style,
          }}
          onPointerDown={() => {
            pointerFocusRef.current = true;
          }}
          onFocus={(e) => {
            if (!pointerFocusRef.current) setIsFocusVisible(true);
            pointerFocusRef.current = false;
            textAreaProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocusVisible(false);
            textAreaProps.onBlur?.(e);
          }}
          onInput={(e) => {
            handleAutoResize();
            textAreaProps.onInput?.(e);
          }}
          {...textAreaProps}
        />
        <FocusRing visible={isFocusVisible} borderRadius={borderRadius} />
      </div>
    );
  }
);
