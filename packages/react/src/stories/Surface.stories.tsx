import type { Meta, StoryObj } from "@storybook/react-vite";
import { Surface } from "../Surface";

const meta: Meta<typeof Surface> = {
  title: "Primitives/Surface",
  component: Surface,
  argTypes: {
    elevation: {
      control: "select",
      options: ["flat", "low", "medium", "high"],
    },
    isInset: { control: "boolean" },
    borderRadius: { control: { type: "range", min: 0, max: 40, step: 2 } },
  },
  args: {
    elevation: "medium",
    isInset: false,
    borderRadius: 12,
  },
};

export default meta;
type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Surface {...args}>
      <p style={{ margin: 0 }}>Neumorphic Surface</p>
    </Surface>
  ),
};

export const Elevations: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {(["flat", "low", "medium", "high"] as const).map((elevation) => (
        <Surface key={elevation} elevation={elevation}>
          <p style={{ margin: 0 }}>{elevation}</p>
        </Surface>
      ))}
    </div>
  ),
};

export const Inset: Story = {
  args: { isInset: true },
  render: (args) => (
    <Surface {...args}>
      <p style={{ margin: 0 }}>Inset (pressed) surface</p>
    </Surface>
  ),
};
