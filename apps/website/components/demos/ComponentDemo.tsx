"use client";

import dynamic from "next/dynamic";
import { useTheme } from "@/lib/theme";
import { AuraformProvider } from "@auraform/react";

const demos: Record<string, React.ComponentType> = {
  "auraform-provider": dynamic(() => import("./AuraformProviderDemo")),
  surface: dynamic(() => import("./SurfaceDemo")),
  "focus-ring": dynamic(() => import("./FocusRingDemo")),
  "soft-button": dynamic(() => import("./SoftButtonDemo")),
  "soft-input": dynamic(() => import("./SoftInputDemo")),
  "soft-text-area": dynamic(() => import("./SoftTextAreaDemo")),
  "soft-checkbox": dynamic(() => import("./SoftCheckboxDemo")),
  "soft-radio": dynamic(() => import("./SoftRadioDemo")),
  "soft-switch": dynamic(() => import("./SoftSwitchDemo")),
  "soft-slider": dynamic(() => import("./SoftSliderDemo")),
  "soft-vertical-slider": dynamic(() => import("./SoftVerticalSliderDemo")),
  "soft-knob": dynamic(() => import("./SoftKnobDemo")),
  "soft-stepper": dynamic(() => import("./SoftStepperDemo")),
  "soft-rating": dynamic(() => import("./SoftRatingDemo")),
  "soft-segmented-control": dynamic(
    () => import("./SoftSegmentedControlDemo")
  ),
  "soft-card": dynamic(() => import("./SoftCardDemo")),
  "soft-progress": dynamic(() => import("./SoftProgressDemo")),
  "soft-chip": dynamic(() => import("./SoftChipDemo")),
  "soft-gauge": dynamic(() => import("./SoftGaugeDemo")),
  "soft-badge": dynamic(() => import("./SoftBadgeDemo")),
  "soft-avatar": dynamic(() => import("./SoftAvatarDemo")),
  "soft-divider": dynamic(() => import("./SoftDividerDemo")),
  "soft-tabs": dynamic(() => import("./SoftTabsDemo")),
  "soft-icon-button": dynamic(() => import("./SoftIconButtonDemo")),
  "soft-tooltip": dynamic(() => import("./SoftTooltipDemo")),
};

export function ComponentDemo({ slug }: { slug: string }) {
  const { baseColor } = useTheme();
  const Demo = demos[slug];

  if (!Demo) {
    return (
      <div className="p-8 text-center text-current/40 rounded-xl border border-current/10">
        Demo not available
      </div>
    );
  }

  return (
    <div
      className="p-6 rounded-xl border border-current/10"
      style={{ background: baseColor }}
    >
      <AuraformProvider baseColor={baseColor}>
        <Demo />
      </AuraformProvider>
    </div>
  );
}
