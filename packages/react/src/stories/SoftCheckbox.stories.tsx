import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftCheckbox } from "../SoftCheckbox";

const meta: Meta<typeof SoftCheckbox> = {
  title: "Form/SoftCheckbox",
  component: SoftCheckbox,
  argTypes: {
    accentColor: { control: "color" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    accentColor: "#4A90D9",
    disabled: false,
    label: "Accept terms",
  },
};

export default meta;
type Story = StoryObj<typeof SoftCheckbox>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled option" },
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SoftCheckbox
          {...args}
          checked={checked}
          onChange={setChecked}
          label="Controlled checkbox"
        />
        <span style={{ fontSize: 14 }}>
          State: {checked ? "Checked" : "Unchecked"}
        </span>
      </div>
    );
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <SoftCheckbox label="Option A" />
      <SoftCheckbox label="Option B" defaultChecked />
      <SoftCheckbox label="Option C" />
      <SoftCheckbox label="Disabled" disabled />
    </div>
  ),
};
