// Provider
export { AuraformProvider, useAuraform } from "./AuraformProvider";
export type {
  AuraformProviderProps,
  AuraformContextValue,
} from "./AuraformProvider";

// Primitives
export { Surface } from "./Surface";
export type { SurfaceProps } from "./Surface";

export { FocusRing } from "./FocusRing";
export type { FocusRingProps } from "./FocusRing";

// Components
export { SoftButton } from "./SoftButton";
export type { SoftButtonProps } from "./SoftButton";

export { SoftInput } from "./SoftInput";
export type { SoftInputProps } from "./SoftInput";

export { SoftSwitch } from "./SoftSwitch";
export type { SoftSwitchProps } from "./SoftSwitch";

// Re-export core types for convenience
export type { Elevation, AuraformTokens } from "@auraform/core";
