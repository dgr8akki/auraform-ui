import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftRating } from "../SoftRating";

const meta: Meta<typeof SoftRating> = {
  title: "Form/SoftRating",
  component: SoftRating,
  argTypes: {
    accentColor: { control: "color" },
    max: { control: { type: "range", min: 3, max: 10, step: 1 } },
    size: { control: { type: "range", min: 20, max: 56, step: 4 } },
    readOnly: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    accentColor: "#F5A623",
    max: 5,
    size: 32,
    readOnly: false,
    disabled: false,
    "aria-label": "Product rating",
  },
};

export default meta;
type Story = StoryObj<typeof SoftRating>;

export const Default: Story = {
  args: { defaultValue: 3 },
};

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState(0);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <SoftRating {...args} value={val} onChange={setVal} />
        <span style={{ fontSize: 14 }}>{val} / {args.max ?? 5}</span>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  args: { defaultValue: 4, readOnly: true },
};

export const Disabled: Story = {
  args: { defaultValue: 2, disabled: true },
};

export const Large: Story = {
  args: { defaultValue: 3, size: 48 },
};

export const CustomColor: Story = {
  args: { defaultValue: 4, accentColor: "#E74C3C" },
};
