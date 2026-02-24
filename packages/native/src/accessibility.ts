import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

/** Hook to detect if the user has "Reduce Motion" enabled at the OS level */
export function useReduceMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);

    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduceMotion
    );

    return () => subscription.remove();
  }, []);

  return reduceMotion;
}

/** Hook to detect if the user has bold text / increased contrast enabled */
export function useBoldText(): boolean {
  const [boldText, setBoldText] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isBoldTextEnabled().then(setBoldText);

    const subscription = AccessibilityInfo.addEventListener(
      "boldTextChanged",
      setBoldText
    );

    return () => subscription.remove();
  }, []);

  return boldText;
}
