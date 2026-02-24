import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftTooltip } from "../SoftTooltip";
import { SoftButton } from "../SoftButton";
import { SoftIconButton } from "../SoftIconButton";

const meta: Meta<typeof SoftTooltip> = {
  title: "Components/SoftTooltip",
  component: SoftTooltip,
  argTypes: {
    content: { control: "text" },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    delay: { control: "number" },
  },
  args: {
    content: "Helpful tooltip",
    placement: "top",
    delay: 200,
  },
};

export default meta;
type Story = StoryObj<typeof SoftTooltip>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: 60, textAlign: "center" }}>
      <SoftTooltip {...args}>
        <SoftButton>Hover me</SoftButton>
      </SoftTooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 60, justifyContent: "center" }}>
      <SoftTooltip content="Top" placement="top">
        <SoftButton>Top</SoftButton>
      </SoftTooltip>
      <SoftTooltip content="Bottom" placement="bottom">
        <SoftButton>Bottom</SoftButton>
      </SoftTooltip>
      <SoftTooltip content="Left" placement="left">
        <SoftButton>Left</SoftButton>
      </SoftTooltip>
      <SoftTooltip content="Right" placement="right">
        <SoftButton>Right</SoftButton>
      </SoftTooltip>
    </div>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <div style={{ padding: 60, textAlign: "center" }}>
      <SoftTooltip content="Settings">
        <SoftIconButton aria-label="Settings">⚙️</SoftIconButton>
      </SoftTooltip>
    </div>
  ),
};
