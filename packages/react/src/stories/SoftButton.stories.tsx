import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftButton } from "../SoftButton";

const meta: Meta<typeof SoftButton> = {
  title: "Form/SoftButton",
  component: SoftButton,
  argTypes: {
    elevation: {
      control: "select",
      options: ["flat", "low", "medium", "high"],
    },
    variant: { control: "select", options: ["default", "primary"] },
    accentColor: { control: "color" },
    borderRadius: { control: { type: "range", min: 0, max: 40, step: 2 } },
    disabled: { control: "boolean" },
  },
  args: {
    elevation: "medium",
    variant: "default",
    accentColor: "#4A90D9",
    borderRadius: 12,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SoftButton>;

export const Default: Story = {
  args: { children: "Click Me" },
};

export const Primary: Story = {
  args: { children: "Primary Action", variant: "primary" },
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <SoftButton>Default</SoftButton>
      <SoftButton variant="primary">Primary</SoftButton>
      <SoftButton disabled>Disabled</SoftButton>
      <SoftButton elevation="low">Low Elevation</SoftButton>
      <SoftButton elevation="high">High Elevation</SoftButton>
    </div>
  ),
};
