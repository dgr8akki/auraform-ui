import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AuraformProvider } from "../AuraformProvider";
import { Surface } from "../Surface";
import { SoftButton } from "../SoftButton";
import { SoftInput } from "../SoftInput";
import { SoftSwitch } from "../SoftSwitch";
import { SoftSlider } from "../SoftSlider";
import { SoftCheckbox } from "../SoftCheckbox";
import { SoftChip } from "../SoftChip";
import { SoftProgress } from "../SoftProgress";
import { SoftKnob } from "../SoftKnob";
import { SoftGauge } from "../SoftGauge";
import { SoftRating } from "../SoftRating";
import { SoftStepper } from "../SoftStepper";
import { SoftSegmentedControl } from "../SoftSegmentedControl";

const DarkShowcase = ({ baseColor }: { baseColor: string }) => {
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <AuraformProvider baseColor={baseColor}>
      <div
        style={{
          padding: 32,
          background: baseColor,
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <h3 style={{ margin: 0 }}>Theme: {baseColor}</h3>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <SoftButton>Default</SoftButton>
          <SoftButton variant="primary">Primary</SoftButton>
          <SoftButton disabled>Disabled</SoftButton>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <SoftInput placeholder="Type here..." style={{ width: 200 }} />
          <SoftSwitch checked={switchOn} onChange={setSwitchOn} aria-label="Toggle" />
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <SoftSlider defaultValue={40} width={200} aria-label="Slider" />
          <SoftCheckbox label="Accept" defaultChecked />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <SoftChip label="React" selectable defaultSelected />
          <SoftChip label="TypeScript" selectable />
          <SoftChip label="Neumorphism" selectable />
        </div>

        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <SoftProgress value={65} showLabel aria-label="Progress" />
          <SoftProgress variant="circular" value={72} size={48} aria-label="Circular" />
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <SoftKnob defaultValue={60} size={64} aria-label="Volume" />
          <SoftStepper defaultValue={3} min={0} max={10} aria-label="Quantity" />
          <SoftRating defaultValue={4} />
        </div>

        <SoftSegmentedControl
          options={[
            { value: "day", label: "Day" },
            { value: "week", label: "Week" },
            { value: "month", label: "Month" },
          ]}
          defaultValue="day"
          aria-label="Period"
        />

        <SoftGauge
          value={72}
          label="Performance"
          unit="%"
          size={140}
          segments={[
            { until: 50, color: "#27AE60" },
            { until: 80, color: "#F5A623" },
            { until: 100, color: "#E74C3C" },
          ]}
        />
      </div>
    </AuraformProvider>
  );
};

const meta: Meta = {
  title: "Showcase/Dark Mode",
};

export default meta;
type Story = StoryObj;

export const DarkGray: Story = {
  render: () => <DarkShowcase baseColor="#2d2d2d" />,
};

export const DarkNavy: Story = {
  render: () => <DarkShowcase baseColor="#1a1a2e" />,
};

export const DarkPlum: Story = {
  render: () => <DarkShowcase baseColor="#2d1b2e" />,
};

export const SideBySide: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 300 }}>
        <DarkShowcase baseColor="#e0e0e0" />
      </div>
      <div style={{ flex: 1, minWidth: 300 }}>
        <DarkShowcase baseColor="#2d2d2d" />
      </div>
    </div>
  ),
};
