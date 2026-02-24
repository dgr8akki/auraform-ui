import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftChip } from "../SoftChip";

const meta: Meta<typeof SoftChip> = {
  title: "Components/SoftChip",
  component: SoftChip,
  argTypes: {
    label: { control: "text" },
    selectable: { control: "boolean" },
    removable: { control: "boolean" },
    accentColor: { control: "color" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Tag",
    accentColor: "#4A90D9",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SoftChip>;

export const Default: Story = {
  args: { label: "Neumorphism" },
};

export const Selectable: Story = {
  args: { label: "Click to select", selectable: true },
};

export const Removable: Story = {
  args: {
    label: "Removable",
    removable: true,
    onRemove: () => alert("Removed!"),
  },
};

export const ChipGroup: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <SoftChip label="React" selectable />
      <SoftChip label="TypeScript" selectable defaultSelected />
      <SoftChip label="Accessibility" selectable />
      <SoftChip label="Delete me" removable onRemove={() => {}} />
      <SoftChip label="Disabled" disabled selectable />
    </div>
  ),
};
