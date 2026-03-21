"use client";
import { useState } from "react";
import { AuraformProvider, Surface } from "@auraform/react";

export default function AuraformProviderDemo() {
  const [baseColor, setBaseColor] = useState("#e0e0e0");
  const [intensity, setIntensity] = useState(15);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 text-sm">
          Base Color
          <input type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Intensity: {intensity}
          <input type="range" min={5} max={30} value={intensity} onChange={e => setIntensity(Number(e.target.value))} />
        </label>
      </div>
      <AuraformProvider baseColor={baseColor} intensity={intensity}>
        <div style={{ background: baseColor, padding: 24, borderRadius: 16 }}>
          <Surface elevation="medium" borderRadius={12}>
            <div style={{ padding: 16 }}>
              <p>This surface adapts to the provider tokens.</p>
            </div>
          </Surface>
        </div>
      </AuraformProvider>
    </div>
  );
}
