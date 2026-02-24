import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftSegmentedControl } from "../SoftSegmentedControl";

const meta: Meta<typeof SoftSegmentedControl> = {
  title: "Form/SoftSegmentedControl",
  component: SoftSegmentedControl,
  argTypes: {
    accentColor: { control: "color" },
    disabled: { control: "boolean" },
  },
  args: {
    accentColor: "#4A90D9",
    disabled: false,
    "aria-label": "View selector",
  },
};

export default meta;
type Story = StoryObj<typeof SoftSegmentedControl>;

export const Default: Story = {
  args: {
    options: [
      { value: "all", label: "All" },
      { value: "active", label: "Active" },
      { value: "archived", label: "Archived" },
    ],
    defaultValue: "all",
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState("monthly");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SoftSegmentedControl
          {...args}
          options={[
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
          ]}
          value={val}
          onChange={setVal}
        />
        <span style={{ fontSize: 14 }}>Selected: {val}</span>
      </div>
    );
  },
};

export const TwoOptions: Story = {
  args: {
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
    ],
    defaultValue: "light",
    "aria-label": "Theme",
  },
};

export const Disabled: Story = {
  args: {
    options: [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
      { value: "c", label: "Option C" },
    ],
    defaultValue: "a",
    disabled: true,
  },
};
