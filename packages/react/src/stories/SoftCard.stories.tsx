import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftCard } from "../SoftCard";

const meta: Meta<typeof SoftCard> = {
  title: "Components/SoftCard",
  component: SoftCard,
  argTypes: {
    elevation: {
      control: "select",
      options: ["flat", "low", "medium", "high"],
    },
    borderRadius: { control: { type: "range", min: 0, max: 32, step: 2 } },
    interactive: { control: "boolean" },
  },
  args: {
    elevation: "medium",
    borderRadius: 16,
    interactive: false,
  },
};

export default meta;
type Story = StoryObj<typeof SoftCard>;

export const Default: Story = {
  args: {
    children: "A simple neumorphic card with some content.",
    style: { width: 300 },
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: "Card Title",
    footer: <span style={{ fontSize: 13, color: "#888" }}>Last updated just now</span>,
    children: "This card has a header and footer slot for structured layouts.",
    style: { width: 320 },
  },
};

export const Interactive: Story = {
  args: {
    header: "Clickable Card",
    children: "Hover and click me to see the press animation.",
    interactive: true,
    style: { width: 300 },
  },
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      {["Low", "Medium", "High"].map((level) => (
        <SoftCard
          key={level}
          elevation={level.toLowerCase() as "low" | "medium" | "high"}
          header={`${level} Elevation`}
          style={{ width: 200 }}
        >
          Elevation: {level.toLowerCase()}
        </SoftCard>
      ))}
    </div>
  ),
};
