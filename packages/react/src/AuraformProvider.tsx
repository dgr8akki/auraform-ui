import React, { createContext, useContext, useMemo } from "react";
import {
  getNeumorphicTokens,
  type AuraformTokens,
  type TokenOptions,
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
  children: React.ReactNode;
}

/**
 * Root provider for Auraform UI.
 * Computes neumorphic tokens from the base color and injects CSS custom properties.
 */
export function AuraformProvider({
  baseColor,
  intensity,
  children,
}: AuraformProviderProps) {
  const tokens = useMemo(
    () => getNeumorphicTokens(baseColor, { intensity } as TokenOptions),
    [baseColor, intensity]
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
