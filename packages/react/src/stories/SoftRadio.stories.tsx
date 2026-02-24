import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftRadioGroup, SoftRadio } from "../SoftRadio";

const meta: Meta<typeof SoftRadioGroup> = {
  title: "Form/SoftRadio",
  component: SoftRadioGroup,
  argTypes: {
    disabled: { control: "boolean" },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SoftRadioGroup>;

export const Default: Story = {
  render: (args) => (
    <SoftRadioGroup defaultValue="basic" aria-label="Select plan" {...args} name="plan">
      <SoftRadio value="basic" label="Basic" />
      <SoftRadio value="pro" label="Pro" />
      <SoftRadio value="enterprise" label="Enterprise" />
    </SoftRadioGroup>
  ),
};

export const WithDisabledOption: Story = {
  render: () => (
    <SoftRadioGroup name="size" defaultValue="md" aria-label="Select size">
      <SoftRadio value="sm" label="Small" />
      <SoftRadio value="md" label="Medium" />
      <SoftRadio value="lg" label="Large" disabled />
    </SoftRadioGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SoftRadioGroup
          name="option"
          value={value}
          onChange={setValue}
          aria-label="Select option"
        >
          <SoftRadio value="a" label="Option A" />
          <SoftRadio value="b" label="Option B" />
          <SoftRadio value="c" label="Option C" />
        </SoftRadioGroup>
        <span style={{ fontSize: 14 }}>Selected: {value}</span>
      </div>
    );
  },
};
