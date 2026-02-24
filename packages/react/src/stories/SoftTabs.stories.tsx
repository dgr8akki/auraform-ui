import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SoftTabs, SoftTabList, SoftTab, SoftTabPanel } from "../SoftTabs";

const meta: Meta<typeof SoftTabs> = {
  title: "Navigation/SoftTabs",
  component: SoftTabs,
};

export default meta;
type Story = StoryObj<typeof SoftTabs>;

export const Default: Story = {
  render: () => (
    <SoftTabs defaultValue="overview">
      <SoftTabList aria-label="Sections">
        <SoftTab value="overview">Overview</SoftTab>
        <SoftTab value="features">Features</SoftTab>
        <SoftTab value="pricing">Pricing</SoftTab>
      </SoftTabList>
      <SoftTabPanel value="overview">
        <p>Auraform UI is an accessibility-first neumorphic component library.</p>
      </SoftTabPanel>
      <SoftTabPanel value="features">
        <p>Dual-signaling, WCAG contrast checking, adaptive borders, and more.</p>
      </SoftTabPanel>
      <SoftTabPanel value="pricing">
        <p>Free and open source — MIT licensed.</p>
      </SoftTabPanel>
    </SoftTabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <SoftTabs defaultValue="tab1">
      <SoftTabList aria-label="Options">
        <SoftTab value="tab1">Active</SoftTab>
        <SoftTab value="tab2">Normal</SoftTab>
        <SoftTab value="tab3" disabled>Disabled</SoftTab>
      </SoftTabList>
      <SoftTabPanel value="tab1">Content for the active tab.</SoftTabPanel>
      <SoftTabPanel value="tab2">Content for the normal tab.</SoftTabPanel>
    </SoftTabs>
  ),
};
