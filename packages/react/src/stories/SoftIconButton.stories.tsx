import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftIconButton } from "../SoftIconButton";

const meta: Meta<typeof SoftIconButton> = {
  title: "Navigation/SoftIconButton",
  component: SoftIconButton,
  argTypes: {
    elevation: {
      control: "select",
      options: ["flat", "low", "medium", "high"],
    },
    shape: { control: "select", options: ["circle", "square"] },
    size: { control: { type: "range", min: 28, max: 72, step: 4 } },
    disabled: { control: "boolean" },
  },
  args: {
    elevation: "medium",
    shape: "circle",
    size: 44,
    disabled: false,
    "aria-label": "Action",
  },
};

export default meta;
type Story = StoryObj<typeof SoftIconButton>;

export const Circle: Story = {
  args: { children: "☀️", "aria-label": "Toggle theme" },
};

export const Square: Story = {
  args: { children: "⚙️", shape: "square", "aria-label": "Settings" },
};

export const Disabled: Story = {
  args: { children: "🔒", disabled: true, "aria-label": "Locked" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <SoftIconButton size={32} aria-label="Small">🔍</SoftIconButton>
      <SoftIconButton size={44} aria-label="Medium">🔍</SoftIconButton>
      <SoftIconButton size={60} aria-label="Large">🔍</SoftIconButton>
    </div>
  ),
};
