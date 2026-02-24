import React from "react";
import { View, type ViewStyle } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { ELEVATION_MAP, type Elevation } from "@auraform/core";
import { useNativeAuraform } from "./NativeAuraformProvider";

export interface NativeSurfaceProps {
  /** Elevation level controlling shadow depth */
  elevation?: Elevation;
  /** Whether the surface appears inset (pressed) */
  isInset?: boolean;
  /** Border radius in pixels */
  borderRadius?: number;
  /** Additional styles */
  style?: ViewStyle;
  children?: React.ReactNode;
}

/**
 * React Native neumorphic surface using SVG-based shadows
 * for consistent rendering on iOS and Android.
 */
export function NativeSurface({
  elevation = "medium",
  isInset = false,
  borderRadius = 12,
  style,
  children,
}: NativeSurfaceProps) {
  const { tokens, highContrast } = useNativeAuraform();

  const { distance, blur } = ELEVATION_MAP[elevation];

  // High contrast mode: increase shadow distance
  const effectiveDistance = highContrast
    ? Math.ceil(distance * 1.3)
    : distance;

  if (elevation === "flat" || isInset) {
    // Flat or inset: no outer shadow, just styled view
    return (
      <View
        style={{
          backgroundColor: tokens.background,
          borderRadius,
          padding: 16,
          borderWidth: tokens.outline !== "none" || highContrast ? 1 : 0,
          borderColor: "rgba(0, 0, 0, 0.1)",
          ...style,
        }}
      >
        {children}
      </View>
    );
  }

  return (
    <Shadow
      distance={effectiveDistance}
      startColor={tokens.darkShadow}
      offset={[effectiveDistance, effectiveDistance]}
      containerStyle={{ borderRadius }}
      style={{ borderRadius }}
    >
      <Shadow
        distance={effectiveDistance}
        startColor={tokens.lightShadow}
        offset={[-effectiveDistance, -effectiveDistance]}
        containerStyle={{ borderRadius }}
        style={{ borderRadius }}
      >
        <View
          style={{
            backgroundColor: tokens.background,
            borderRadius,
            padding: 16,
            borderWidth: tokens.outline !== "none" || highContrast ? 1 : 0,
            borderColor: "rgba(0, 0, 0, 0.1)",
            ...style,
          }}
        >
          {children}
        </View>
      </Shadow>
    </Shadow>
  );
}
