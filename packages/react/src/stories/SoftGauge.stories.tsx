import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftGauge } from "../SoftGauge";

const meta: Meta<typeof SoftGauge> = {
  title: "Display/SoftGauge",
  component: SoftGauge,
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    accentColor: { control: "color" },
    size: { control: { type: "range", min: 80, max: 300, step: 20 } },
    min: { control: "number" },
    max: { control: "number" },
  },
  args: {
    value: 65,
    accentColor: "#4A90D9",
    size: 160,
    min: 0,
    max: 100,
  },
};

export default meta;
type Story = StoryObj<typeof SoftGauge>;

export const Default: Story = {
  args: { label: "Speed", unit: "km/h" },
};

export const WithSegments: Story = {
  args: {
    value: 72,
    label: "CPU Usage",
    unit: "%",
    segments: [
      { until: 50, color: "#27AE60" },
      { until: 80, color: "#F5A623" },
      { until: 100, color: "#E74C3C" },
    ],
  },
};

export const Small: Story = {
  args: { value: 40, size: 100, label: "Temp", unit: "°C" },
};

export const Dashboard: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <SoftGauge
        value={72}
        label="CPU"
        unit="%"
        segments={[
          { until: 50, color: "#27AE60" },
          { until: 80, color: "#F5A623" },
          { until: 100, color: "#E74C3C" },
        ]}
      />
      <SoftGauge value={45} label="Memory" unit="%" accentColor="#9B59B6" />
      <SoftGauge value={88} label="Disk" unit="%" accentColor="#E74C3C" />
      <SoftGauge
        value={34}
        label="Network"
        unit="Mbps"
        max={200}
        accentColor="#2ECC71"
      />
    </div>
  ),
};
