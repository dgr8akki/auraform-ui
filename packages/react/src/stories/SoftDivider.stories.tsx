import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftDivider } from "../SoftDivider";

const meta: Meta<typeof SoftDivider> = {
  title: "Components/SoftDivider",
  component: SoftDivider,
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    spacing: { control: { type: "range", min: 0, max: 40, step: 4 } },
  },
  args: {
    orientation: "horizontal",
    spacing: 12,
  },
};

export default meta;
type Story = StoryObj<typeof SoftDivider>;

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ width: 300 }}>
      <p>Content above</p>
      <SoftDivider {...args} />
      <p>Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", height: 60 }}>
      <span>Left</span>
      <SoftDivider orientation="vertical" length={40} />
      <span>Right</span>
    </div>
  ),
};
