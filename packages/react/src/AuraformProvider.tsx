import React, { createContext, useContext, useMemo } from "react";
import {
  getNeumorphicTokens,
  type AuraformTokens,
  type TokenOptions,
  type ColorMode,
} from "@auraform/core";

export interface AuraformContextValue {
  tokens: AuraformTokens;
  baseColor: string;
}

const AuraformContext = createContext<AuraformContextValue | null>(null);

export interface AuraformProviderProps {
  /** Base background color (hex). All shadow tokens are derived from this. */
  baseColor: string;
  /** Override the default shadow intensity (default: 15) */
  intensity?: number;
  /** Color mode: "light", "dark", or "auto" (auto-detects from base color lightness). Default: "auto" */
  mode?: ColorMode | "auto";
  children: React.ReactNode;
}

/**
 * Root provider for Auraform UI.
 * Computes neumorphic tokens from the base color and injects CSS custom properties.
 */
export function AuraformProvider({
  baseColor,
  intensity,
  mode = "auto",
  children,
}: AuraformProviderProps) {
  const tokens = useMemo(
    () => getNeumorphicTokens(baseColor, { intensity, mode } as TokenOptions),
    [baseColor, intensity, mode]
  );

  const contextValue = useMemo<AuraformContextValue>(
    () => ({ tokens, baseColor }),
    [tokens, baseColor]
  );

  const cssVars = {
    "--af-bg": tokens.background,
    "--af-light-shadow": tokens.lightShadow,
    "--af-dark-shadow": tokens.darkShadow,
    "--af-border": tokens.outline,
    "--af-text": tokens.textColor,
    "--af-text-secondary": tokens.textSecondary,
    "--af-border-subtle": tokens.borderSubtle,
  } as React.CSSProperties;

  return (
    <AuraformContext.Provider value={contextValue}>
      <div style={cssVars}>{children}</div>
    </AuraformContext.Provider>
  );
}

/**
 * Hook to access Auraform tokens from context.
 * Must be used within an AuraformProvider.
 */
export function useAuraform(): AuraformContextValue {
  const ctx = useContext(AuraformContext);
  if (!ctx) {
    throw new Error("useAuraform must be used within an <AuraformProvider>");
  }
  return ctx;
}
