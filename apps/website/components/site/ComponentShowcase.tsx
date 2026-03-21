"use client";

import { AuraformProvider, SoftButton, SoftSlider, SoftKnob, SoftSwitch, SoftProgress, SoftCard, SoftRating, SoftSegmentedControl, SoftGauge, SoftTabs, SoftTabList, SoftTab, SoftTabPanel } from "@auraform/react";
import { useTheme } from "@/lib/theme";

export function ComponentShowcase() {
  const { baseColor } = useTheme();

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Component Showcase</h2>
        <p className="text-current/60">
          Live rendered components — not screenshots.
        </p>
      </div>
      <div
        className="p-8 rounded-2xl"
        style={{ background: baseColor }}
      >
        <AuraformProvider baseColor={baseColor}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
            {/* Button */}
            <div className="flex flex-col items-center gap-2">
              <SoftButton variant="primary">Click Me</SoftButton>
              <span className="text-xs text-current/40">SoftButton</span>
            </div>

            {/* Slider */}
            <div className="flex flex-col items-center gap-2">
              <SoftSlider defaultValue={60} width={140} aria-label="Demo slider" />
              <span className="text-xs text-current/40">SoftSlider</span>
            </div>

            {/* Knob */}
            <div className="flex flex-col items-center gap-2">
              <SoftKnob defaultValue={65} size={64} aria-label="Demo knob" />
              <span className="text-xs text-current/40">SoftKnob</span>
            </div>

            {/* Switch */}
            <div className="flex flex-col items-center gap-2">
              <SoftSwitch defaultChecked aria-label="Demo switch" />
              <span className="text-xs text-current/40">SoftSwitch</span>
            </div>

            {/* Gauge */}
            <div className="flex flex-col items-center gap-2">
              <SoftGauge
                value={72}
                size={100}
                label="CPU"
                unit="%"
                segments={[
                  { until: 50, color: "#27AE60" },
                  { until: 80, color: "#F5A623" },
                  { until: 100, color: "#E74C3C" },
                ]}
              />
              <span className="text-xs text-current/40">SoftGauge</span>
            </div>

            {/* Progress */}
            <div className="flex flex-col items-center gap-2">
              <SoftProgress value={75} variant="circular" size={48} aria-label="Demo progress" />
              <span className="text-xs text-current/40">SoftProgress</span>
            </div>

            {/* Rating */}
            <div className="flex flex-col items-center gap-2">
              <SoftRating defaultValue={4} size={24} aria-label="Demo rating" />
              <span className="text-xs text-current/40">SoftRating</span>
            </div>

            {/* Segmented Control */}
            <div className="flex flex-col items-center gap-2">
              <SoftSegmentedControl
                options={[
                  { value: "day", label: "Day" },
                  { value: "week", label: "Week" },
                  { value: "month", label: "Mo" },
                ]}
                defaultValue="week"
                aria-label="Period"
              />
              <span className="text-xs text-current/40">SoftSegmentedControl</span>
            </div>

            {/* Tabs */}
            <div className="flex flex-col items-center gap-2 col-span-2">
              <SoftTabs defaultValue="a">
                <SoftTabList aria-label="Demo tabs">
                  <SoftTab value="a">Overview</SoftTab>
                  <SoftTab value="b">Features</SoftTab>
                  <SoftTab value="c">API</SoftTab>
                </SoftTabList>
                <SoftTabPanel value="a">
                  <p className="text-sm p-2">Tab content here.</p>
                </SoftTabPanel>
                <SoftTabPanel value="b">
                  <p className="text-sm p-2">Feature details.</p>
                </SoftTabPanel>
                <SoftTabPanel value="c">
                  <p className="text-sm p-2">API reference.</p>
                </SoftTabPanel>
              </SoftTabs>
              <span className="text-xs text-current/40">SoftTabs</span>
            </div>

            {/* Card */}
            <div className="flex flex-col items-center gap-2 col-span-2">
              <SoftCard header="Neumorphic Card" style={{ width: 220 }}>
                <p className="text-sm">Content with depth and texture.</p>
              </SoftCard>
              <span className="text-xs text-current/40">SoftCard</span>
            </div>
          </div>
        </AuraformProvider>
      </div>
    </section>
  );
}
