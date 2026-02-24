import React from "react";
import type { Preview } from "storybook/internal/types";
import { AuraformProvider } from "../src/AuraformProvider";
import { getNeumorphicTokens } from "@auraform/core";

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const baseColor = context.globals.baseColor || "#e0e0e0";
      const tokens = getNeumorphicTokens(baseColor);
      return (
        <AuraformProvider baseColor={baseColor}>
          <div
            style={{
              padding: 40,
              background: baseColor,
              minHeight: "100vh",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              color: tokens.textColor,
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
          { value: "#2d2d2d", title: "Dark Gray" },
          { value: "#1a1a2e", title: "Dark Navy" },
          { value: "#2d1b2e", title: "Dark Plum" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
