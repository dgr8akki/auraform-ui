import React, { createContext, useContext, useMemo } from "react";
import {
  getNeumorphicTokens,
  type AuraformTokens,
  type TokenOptions,
} from "@auraform/core";
import { useReduceMotion, useBoldText } from "./accessibility";

export interface NativeAuraformContextValue {
  tokens: AuraformTokens;
  baseColor: string;
  /** Whether the OS "Reduce Motion" setting is enabled */
  reduceMotion: boolean;
  /** Whether the OS bold text / increased contrast setting is enabled */
  highContrast: boolean;
}

const NativeAuraformContext =
  createContext<NativeAuraformContextValue | null>(null);

export interface NativeAuraformProviderProps {
  /** Base background color (hex) */
  baseColor: string;
  /** Override the default shadow intensity (default: 15) */
  intensity?: number;
  children: React.ReactNode;
}

/**
 * Root provider for Auraform UI on React Native.
 * Computes neumorphic tokens and detects OS accessibility settings.
 */
export function NativeAuraformProvider({
  baseColor,
  intensity,
  children,
}: NativeAuraformProviderProps) {
  const reduceMotion = useReduceMotion();
  const highContrast = useBoldText();

  // In high-contrast mode, increase shadow intensity for better visibility
  const effectiveIntensity = highContrast ? (intensity ?? 15) + 5 : intensity;

  const tokens = useMemo(
    () =>
      getNeumorphicTokens(baseColor, {
        intensity: effectiveIntensity,
      } as TokenOptions),
    [baseColor, effectiveIntensity]
  );

  const contextValue = useMemo<NativeAuraformContextValue>(
    () => ({ tokens, baseColor, reduceMotion, highContrast }),
    [tokens, baseColor, reduceMotion, highContrast]
  );

  return (
    <NativeAuraformContext.Provider value={contextValue}>
      {children}
    </NativeAuraformContext.Provider>
  );
}

/**
 * Hook to access Auraform tokens and accessibility state from context.
 * Must be used within a NativeAuraformProvider.
 */
export function useNativeAuraform(): NativeAuraformContextValue {
  const ctx = useContext(NativeAuraformContext);
  if (!ctx) {
    throw new Error(
      "useNativeAuraform must be used within a <NativeAuraformProvider>"
    );
  }
  return ctx;
}
