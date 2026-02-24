import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftAvatar } from "../SoftAvatar";

const meta: Meta<typeof SoftAvatar> = {
  title: "Display/SoftAvatar",
  component: SoftAvatar,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    shape: { control: "select", options: ["circle", "rounded"] },
    fallback: { control: "text" },
    src: { control: "text" },
  },
  args: {
    size: "md",
    shape: "circle",
    fallback: "AU",
  },
};

export default meta;
type Story = StoryObj<typeof SoftAvatar>;

export const Initials: Story = {
  args: { fallback: "AU", "aria-label": "Auraform User" },
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    alt: "User avatar",
  },
};

export const Rounded: Story = {
  args: { fallback: "RD", shape: "rounded", size: "lg" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <SoftAvatar size="sm" fallback="SM" />
      <SoftAvatar size="md" fallback="MD" />
      <SoftAvatar size="lg" fallback="LG" />
    </div>
  ),
};

export const BrokenImage: Story = {
  args: {
    src: "https://invalid-url.example/broken.jpg",
    fallback: "?",
    "aria-label": "Broken image fallback",
  },
};
