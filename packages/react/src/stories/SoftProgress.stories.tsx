import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftProgress } from "../SoftProgress";

const meta: Meta<typeof SoftProgress> = {
  title: "Display/SoftProgress",
  component: SoftProgress,
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    variant: { control: "select", options: ["linear", "circular"] },
    accentColor: { control: "color" },
    showLabel: { control: "boolean" },
    size: { control: { type: "range", min: 40, max: 300, step: 10 } },
    thickness: { control: { type: "range", min: 2, max: 16, step: 1 } },
  },
  args: {
    accentColor: "#4A90D9",
    showLabel: false,
    "aria-label": "Loading progress",
  },
};

export default meta;
type Story = StoryObj<typeof SoftProgress>;

export const LinearDeterminate: Story = {
  args: { value: 65, variant: "linear", size: 240, showLabel: true },
};

export const LinearIndeterminate: Story = {
  args: { variant: "linear", size: 240 },
};

export const CircularDeterminate: Story = {
  args: { value: 75, variant: "circular", size: 64, thickness: 5, showLabel: true },
};

export const CircularIndeterminate: Story = {
  args: { variant: "circular", size: 48 },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
      <SoftProgress value={40} variant="linear" size={180} showLabel aria-label="Linear" />
      <SoftProgress variant="linear" size={180} aria-label="Linear indeterminate" />
      <SoftProgress value={80} variant="circular" size={56} thickness={5} showLabel aria-label="Circular" />
      <SoftProgress variant="circular" size={48} aria-label="Circular indeterminate" />
    </div>
  ),
};
