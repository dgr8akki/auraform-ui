import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftTextArea } from "../SoftTextArea";

const meta: Meta<typeof SoftTextArea> = {
  title: "Components/SoftTextArea",
  component: SoftTextArea,
  argTypes: {
    accentColor: { control: "color" },
    borderRadius: { control: { type: "range", min: 0, max: 24, step: 2 } },
    autoResize: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    accentColor: "#4A90D9",
    borderRadius: 12,
    autoResize: false,
    placeholder: "Type something...",
  },
};

export default meta;
type Story = StoryObj<typeof SoftTextArea>;

export const Default: Story = {
  args: { rows: 4 },
};

export const AutoResize: Story = {
  args: { autoResize: true, rows: 2, placeholder: "Start typing — I'll grow!" },
};

export const Disabled: Story = {
  args: { disabled: true, value: "Read-only content" },
};
