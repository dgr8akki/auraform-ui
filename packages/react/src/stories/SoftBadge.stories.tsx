import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftBadge } from "../SoftBadge";
import { SoftIconButton } from "../SoftIconButton";

const meta: Meta<typeof SoftBadge> = {
  title: "Components/SoftBadge",
  component: SoftBadge,
  argTypes: {
    count: { control: "number" },
    max: { control: "number" },
    dot: { control: "boolean" },
    color: { control: "color" },
  },
  args: {
    count: 5,
    max: 99,
    dot: false,
    color: "#E74C3C",
  },
};

export default meta;
type Story = StoryObj<typeof SoftBadge>;

export const WithCount: Story = {
  render: (args) => (
    <SoftBadge {...args}>
      <SoftIconButton aria-label="Notifications">🔔</SoftIconButton>
    </SoftBadge>
  ),
};

export const DotIndicator: Story = {
  render: () => (
    <SoftBadge dot>
      <SoftIconButton aria-label="Messages">✉️</SoftIconButton>
    </SoftBadge>
  ),
};

export const MaxCount: Story = {
  render: () => (
    <SoftBadge count={150} max={99}>
      <SoftIconButton aria-label="Inbox">📥</SoftIconButton>
    </SoftBadge>
  ),
};

export const NoBadge: Story = {
  render: () => (
    <SoftBadge count={0}>
      <SoftIconButton aria-label="Alerts">🔔</SoftIconButton>
    </SoftBadge>
  ),
};
