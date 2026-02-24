import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useId,
} from "react";
import { motion } from "framer-motion";
import { useAuraform } from "./AuraformProvider";
import { FocusRing } from "./FocusRing";

/* ------------------------------------------------------------------ */
/*  Tabs Context                                                       */
/* ------------------------------------------------------------------ */

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("SoftTab / SoftTabPanel must be used within <SoftTabs>");
  }
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  SoftTabs (root container)                                          */
/* ------------------------------------------------------------------ */

export interface SoftTabsProps {
  /** Currently active tab id (controlled) */
  value?: string;
  /** Default active tab id (uncontrolled) */
  defaultValue: string;
  /** Change handler */
  onChange?: (tabId: string) => void;
  children: React.ReactNode;
}

/**
 * Root container for neumorphic tab navigation.
 * Manages active state and provides context to SoftTabList / SoftTabPanel.
 */
export function SoftTabs({
  value: controlledValue,
  defaultValue,
  onChange,
  children,
}: SoftTabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const baseId = useId();

  const activeTab = controlledValue ?? internalValue;

  const setActiveTab = useCallback(
    (id: string) => {
      if (controlledValue === undefined) {
        setInternalValue(id);
      }
      onChange?.(id);
    },
    [controlledValue, onChange]
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, baseId }}>
      {children}
    </TabsContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  SoftTabList                                                        */
/* ------------------------------------------------------------------ */

export interface SoftTabListProps {
  /** Accessible label for the tab list */
  "aria-label"?: string;
  children: React.ReactNode;
}

/**
 * Container for SoftTab items with arrow-key navigation.
 */
export const SoftTabList = forwardRef<HTMLDivElement, SoftTabListProps>(
  function SoftTabList({ children, ...ariaProps }, ref) {
    const { tokens } = useAuraform();
    const listRef = useRef<HTMLDivElement>(null);

    const insetShadow = `inset 2px 2px 5px ${tokens.darkShadow}, inset -2px -2px 5px ${tokens.lightShadow}`;

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const tabs = listRef.current?.querySelectorAll<HTMLElement>(
        '[role="tab"]:not([disabled])'
      );
      if (!tabs || tabs.length === 0) return;

      const items = Array.from(tabs);
      const currentIndex = items.findIndex(
        (el) => el === document.activeElement
      );
      let nextIndex = -1;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % items.length;
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + items.length) % items.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = items.length - 1;
      }

      if (nextIndex >= 0) {
        items[nextIndex].focus();
        items[nextIndex].click();
      }
    };

    return (
      <div
        ref={(node) => {
          (listRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="tablist"
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
        }}
      >
        {children}
      </div>
    );
  }
);

/* ------------------------------------------------------------------ */
/*  SoftTab                                                            */
/* ------------------------------------------------------------------ */

export interface SoftTabProps {
  /** Unique tab identifier */
  value: string;
  /** Tab label */
  children: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Accent color for active tab */
  accentColor?: string;
}

/**
 * Individual tab button within a SoftTabList.
 * Active tab uses accent color + extruded depth; inactive is flat.
 */
export const SoftTab = forwardRef<HTMLButtonElement, SoftTabProps>(
  function SoftTab(
    { value, children, disabled = false, accentColor = "#4A90D9" },
    ref
  ) {
    const { tokens } = useAuraform();
    const { activeTab, setActiveTab, baseId } = useTabs();
    const [isFocusVisible, setIsFocusVisible] = useState(false);

    const isActive = activeTab === value;
    const extrudedShadow = `2px 2px 4px ${tokens.darkShadow}, -2px -2px 4px ${tokens.lightShadow}`;

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <motion.button
          ref={ref}
          role="tab"
          type="button"
          id={`${baseId}-tab-${value}`}
          aria-selected={isActive}
          aria-controls={`${baseId}-panel-${value}`}
          tabIndex={isActive ? 0 : -1}
          disabled={disabled}
          onClick={() => {
            if (!disabled) setActiveTab(value);
          }}
          onFocus={(e) => {
            if (e.target.matches(":focus-visible")) setIsFocusVisible(true);
          }}
          onBlur={() => setIsFocusVisible(false)}
          style={{
            padding: "8px 18px",
            borderRadius: 8,
            border: "none",
            background: isActive ? tokens.background : "transparent",
            boxShadow: isActive ? extrudedShadow : "none",
            color: isActive ? accentColor : "inherit",
            fontWeight: isActive ? 600 : 400,
            fontSize: "inherit",
            fontFamily: "inherit",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
            outline: "none",
          }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.button>
        <FocusRing visible={isFocusVisible} borderRadius={8} />
      </div>
    );
  }
);

/* ------------------------------------------------------------------ */
/*  SoftTabPanel                                                       */
/* ------------------------------------------------------------------ */

export interface SoftTabPanelProps {
  /** Must match a SoftTab value */
  value: string;
  children: React.ReactNode;
}

/**
 * Content panel associated with a SoftTab.
 * Only renders when its tab is active.
 */
export function SoftTabPanel({ value, children }: SoftTabPanelProps) {
  const { activeTab, baseId } = useTabs();

  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      style={{ padding: "16px 0", outline: "none" }}
    >
      {children}
    </div>
  );
}
