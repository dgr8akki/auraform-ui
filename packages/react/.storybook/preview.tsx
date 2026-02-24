import React from "react";
import type { Preview } from "storybook/internal/types";
import { AuraformProvider } from "../src/AuraformProvider";

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const baseColor = context.globals.baseColor || "#e0e0e0";
      return (
        <AuraformProvider baseColor={baseColor}>
          <div
            style={{
              padding: 40,
              background: baseColor,
              minHeight: "100vh",
            }}
          >
            <Story />
          </div>
        </AuraformProvider>
      );
    },
  ],
  globalTypes: {
    baseColor: {
      description: "Base background color for neumorphic theme",
      toolbar: {
        title: "Base Color",
        items: [
          { value: "#e0e0e0", title: "Light Gray (Default)" },
          { value: "#d0d0d0", title: "Medium Gray" },
          { value: "#f0e6d3", title: "Warm Beige" },
          { value: "#d3e0f0", title: "Cool Blue" },
          { value: "#e0d3f0", title: "Soft Lavender" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
