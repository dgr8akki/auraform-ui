import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SoftSwitch } from "../SoftSwitch";

const meta: Meta<typeof SoftSwitch> = {
  title: "Components/SoftSwitch",
  component: SoftSwitch,
  argTypes: {
    accentColor: { control: "color" },
    disabled: { control: "boolean" },
  },
  args: {
    accentColor: "#4A90D9",
    disabled: false,
    "aria-label": "Toggle setting",
  },
};

export default meta;
type Story = StoryObj<typeof SoftSwitch>;

export const Default: Story = {
  args: { defaultChecked: false },
};

export const CheckedByDefault: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <SoftSwitch
          {...args}
          checked={checked}
          onChange={setChecked}
          aria-label="Controlled toggle"
        />
        <span style={{ color: "#555" }}>
          {checked ? "On" : "Off"}
        </span>
      </div>
    );
  },
};
