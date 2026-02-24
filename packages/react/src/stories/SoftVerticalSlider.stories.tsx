import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftVerticalSlider } from "../SoftVerticalSlider";

const meta: Meta<typeof SoftVerticalSlider> = {
  title: "Form/SoftVerticalSlider",
  component: SoftVerticalSlider,
  argTypes: {
    accentColor: { control: "color" },
    height: { control: { type: "range", min: 100, max: 400, step: 20 } },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    accentColor: "#4A90D9",
    height: 200,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    "aria-label": "Volume",
  },
};

export default meta;
type Story = StoryObj<typeof SoftVerticalSlider>;

export const Default: Story = {
  args: { defaultValue: 60 },
};

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState(50);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <SoftVerticalSlider {...args} value={val} onChange={setVal} />
        <span style={{ fontSize: 14 }}>{val}</span>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { defaultValue: 40, disabled: true },
};

export const MixerChannels: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
      {["L", "R", "Sub", "Aux 1", "Aux 2"].map((label) => (
        <div
          key={label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <SoftVerticalSlider
            defaultValue={30 + Math.random() * 60}
            height={180}
            aria-label={label}
          />
          <span style={{ fontSize: 11, fontWeight: 500 }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};
