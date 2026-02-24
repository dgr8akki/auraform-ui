import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftSlider } from "../SoftSlider";

const meta: Meta<typeof SoftSlider> = {
  title: "Form/SoftSlider",
  component: SoftSlider,
  argTypes: {
    accentColor: { control: "color" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    width: { control: { type: "range", min: 100, max: 400, step: 20 } },
    disabled: { control: "boolean" },
  },
  args: {
    accentColor: "#4A90D9",
    min: 0,
    max: 100,
    step: 1,
    width: 240,
    disabled: false,
    "aria-label": "Volume",
  },
};

export default meta;
type Story = StoryObj<typeof SoftSlider>;

export const Default: Story = {
  args: { defaultValue: 40 },
};

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState(50);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <SoftSlider {...args} value={val} onChange={setVal} />
        <span style={{ fontSize: 14, minWidth: 30 }}>{val}</span>
      </div>
    );
  },
};

export const Steps: Story = {
  args: { defaultValue: 20, step: 10, max: 100, "aria-label": "Step slider" },
};

export const Disabled: Story = {
  args: { defaultValue: 60, disabled: true },
};
