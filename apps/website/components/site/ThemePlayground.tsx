"use client";

import { useState } from "react";
import {
  AuraformProvider,
  SoftButton,
  SoftSlider,
  SoftSwitch,
  SoftCard,
  SoftProgress,
} from "@auraform/react";
import { getNeumorphicTokens } from "@auraform/core";

const presets: Record<string, string> = {
  silver: "#e0e0e0",
  warmGray: "#e8e0d8",
  coolBlue: "#d3e0f0",
  lavender: "#e0d3f0",
  mint: "#d3f0e0",
  peach: "#f0ddd3",
  charcoal: "#2d2d3d",
  midnight: "#1e2030",
  slate: "#303845",
  espresso: "#352820",
};

export function ThemePlayground() {
  const [baseColor, setBaseColor] = useState("#e0e0e0");
  const [intensity, setIntensity] = useState(15);

  const tokens = getNeumorphicTokens(baseColor, { intensity });

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Theme Playground</h2>
        <p className="text-current/60">
          Pick a color, adjust intensity, see live results.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Base Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-12 h-10 rounded cursor-pointer"
              />
              <span className="font-mono text-sm">{baseColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(presets).map(([name, color]) => (
                <button
                  key={name}
                  onClick={() => setBaseColor(color)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-current/10 text-xs hover:border-current/20 transition-colors"
                >
                  <span
                    className="w-4 h-4 rounded-full border border-current/20"
                    style={{ background: color }}
                  />
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Intensity: {intensity}
            </label>
            <input
              type="range"
              min={5}
              max={30}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-current/40 mt-1">
              <span>Subtle (5)</span>
              <span>Bold (30)</span>
            </div>
          </div>

          {/* Token preview */}
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded border border-current/20"
                style={{ background: tokens.background }}
              />
              <span>background: {tokens.background}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded border border-current/20"
                style={{ background: tokens.lightShadow }}
              />
              <span>lightShadow: {tokens.lightShadow}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded border border-current/20"
                style={{ background: tokens.darkShadow }}
              />
              <span>darkShadow: {tokens.darkShadow}</span>
            </div>
            <div>mode: {tokens.mode}</div>
            <div>outline: {tokens.outline}</div>
          </div>
        </div>

        {/* Preview */}
        <div
          className="p-8 rounded-2xl"
          style={{ background: baseColor }}
        >
          <AuraformProvider baseColor={baseColor} intensity={intensity}>
            <div className="space-y-6">
              <SoftCard header="Preview Card">
                <p className="text-sm" style={{ color: tokens.textColor }}>
                  Components adapt to your theme automatically.
                </p>
              </SoftCard>

              <div className="flex items-center gap-4">
                <SoftButton>Default</SoftButton>
                <SoftButton variant="primary">Primary</SoftButton>
              </div>

              <SoftSlider defaultValue={60} width={200} aria-label="Preview slider" />

              <div className="flex items-center gap-4">
                <SoftSwitch defaultChecked aria-label="Preview switch" />
                <SoftProgress value={70} variant="circular" size={36} aria-label="Preview progress" />
              </div>
            </div>
          </AuraformProvider>
        </div>
      </div>
    </section>
  );
}
