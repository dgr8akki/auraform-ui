"use client";
import { useState } from "react";
import { SoftGauge } from "@auraform/react";

export default function SoftGaugeDemo() {
  const [value, setValue] = useState(62);
  const [size, setSize] = useState(180);
  const [accentColor, setAccentColor] = useState("#3B82F6");
  const [useSegments, setUseSegments] = useState(false);

  const segments = [
    { until: 40, color: "#22C55E" },
    { until: 70, color: "#EAB308" },
    { until: 100, color: "#EF4444" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <label className="flex items-center gap-2">
          Value: {value}
          <input type="range" min={0} max={100} value={value} onChange={e => setValue(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          Size: {size}px
          <input type="range" min={80} max={300} value={size} onChange={e => setSize(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          Color <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={useSegments} onChange={e => setUseSegments(e.target.checked)} /> Use Segments (green/yellow/red)
        </label>
      </div>
      <div className="flex items-center justify-center p-4">
        <SoftGauge
          value={value}
          size={size}
          accentColor={useSegments ? undefined : accentColor}
          segments={useSegments ? segments : undefined}
        />
      </div>
      <p className="text-center text-sm font-mono">{value}%</p>
    </div>
  );
}
