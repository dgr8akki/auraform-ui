import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftKnob } from "../SoftKnob";

const meta: Meta<typeof SoftKnob> = {
  title: "Form/SoftKnob",
  component: SoftKnob,
  argTypes: {
    accentColor: { control: "color" },
    size: { control: { type: "range", min: 48, max: 160, step: 8 } },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    accentColor: "#4A90D9",
    size: 80,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    "aria-label": "Volume",
  },
};

export default meta;
type Story = StoryObj<typeof SoftKnob>;

export const Default: Story = {
  args: { defaultValue: 40 },
};

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState(50);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <SoftKnob {...args} value={val} onChange={setVal} />
        <span style={{ fontSize: 14, minWidth: 30 }}>{val}</span>
      </div>
    );
  },
};

export const Large: Story = {
  args: { defaultValue: 70, size: 120 },
};

export const Disabled: Story = {
  args: { defaultValue: 30, disabled: true },
};

export const AudioMixer: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
      {["Bass", "Mid", "Treble", "Gain"].map((label) => (
        <div
          key={label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <SoftKnob defaultValue={Math.random() * 100} size={64} aria-label={label} />
          <span style={{ fontSize: 12, fontWeight: 500 }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};
