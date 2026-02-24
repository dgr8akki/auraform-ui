import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftStepper } from "../SoftStepper";

const meta: Meta<typeof SoftStepper> = {
  title: "Form/SoftStepper",
  component: SoftStepper,
  argTypes: {
    accentColor: { control: "color" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    accentColor: "#4A90D9",
    min: 0,
    max: 10,
    step: 1,
    disabled: false,
    "aria-label": "Quantity",
  },
};

export default meta;
type Story = StoryObj<typeof SoftStepper>;

export const Default: Story = {
  args: { defaultValue: 3 },
};

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState(1);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <SoftStepper {...args} value={val} onChange={setVal} />
        <span style={{ fontSize: 14 }}>Qty: {val}</span>
      </div>
    );
  },
};

export const WithBounds: Story = {
  args: { defaultValue: 0, min: 0, max: 5 },
};

export const Disabled: Story = {
  args: { defaultValue: 2, disabled: true },
};

export const DecimalSteps: Story = {
  args: { defaultValue: 1.0, min: 0, max: 5, step: 0.5, "aria-label": "Weight (kg)" },
};
