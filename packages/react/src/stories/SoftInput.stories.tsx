import type { Meta, StoryObj } from "@storybook/react";
import { SoftInput } from "../SoftInput";

const meta: Meta<typeof SoftInput> = {
  title: "Components/SoftInput",
  component: SoftInput,
  argTypes: {
    borderRadius: { control: { type: "range", min: 0, max: 40, step: 2 } },
    accentColor: { control: "color" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    borderRadius: 12,
    accentColor: "#4A90D9",
    placeholder: "Type something...",
  },
};

export default meta;
type Story = StoryObj<typeof SoftInput>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input" },
};

export const WithValue: Story = {
  args: { defaultValue: "Hello, Auraform!" },
};
