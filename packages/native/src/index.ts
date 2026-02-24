// Provider
export {
  NativeAuraformProvider,
  useNativeAuraform,
} from "./NativeAuraformProvider";
export type {
  NativeAuraformProviderProps,
  NativeAuraformContextValue,
} from "./NativeAuraformProvider";

// Components
export { NativeSurface } from "./NativeSurface";
export type { NativeSurfaceProps } from "./NativeSurface";

// Accessibility hooks
export { useReduceMotion, useBoldText } from "./accessibility";

// Re-export core types for convenience
export type { Elevation, AuraformTokens } from "@auraform/core";
