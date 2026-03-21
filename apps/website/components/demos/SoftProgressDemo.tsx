"use client";
import { useState } from "react";
import { SoftProgress } from "@auraform/react";

export default function SoftProgressDemo() {
  const [value, setValue] = useState(65);
  const [variant, setVariant] = useState<"linear" | "circular">("linear");
  const [accentColor, setAccentColor] = useState("#22C55E");
  const [size, setSize] = useState(8);
  const [showLabel, setShowLabel] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <label className="flex items-center gap-2">
          Value: {value}%
          <input type="range" min={0} max={100} value={value} onChange={e => setValue(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          Variant
          <select
            value={variant}
            onChange={e => setVariant(e.target.value as "linear" | "circular")}
            className="border rounded px-2 py-1"
          >
            <option value="linear">Linear</option>
            <option value="circular">Circular</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          Color <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
        </label>
        <label className="flex items-center gap-2">
          Size: {size}
          <input type="range" min={4} max={24} value={size} onChange={e => setSize(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={showLabel} onChange={e => setShowLabel(e.target.checked)} /> Show Label
        </label>
      </div>
      <div className="flex items-center justify-center p-4">
        <SoftProgress
          value={value}
          variant={variant}
          accentColor={accentColor}
          size={size}
          showLabel={showLabel}
        />
      </div>
    </div>
  );
}
