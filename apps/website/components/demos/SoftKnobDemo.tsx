"use client";
import { useState } from "react";
import { SoftKnob } from "@auraform/react";

export default function SoftKnobDemo() {
  const [accentColor, setAccentColor] = useState("#4A90D9");
  const [size, setSize] = useState(80);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState(50);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 text-sm">
          Accent Color
          <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Size: {size}px
          <input type="range" min={48} max={160} value={size} onChange={e => setSize(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Disabled
          <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
        </label>
      </div>
      <SoftKnob
        value={value}
        onChange={setValue}
        size={size}
        accentColor={accentColor}
        disabled={disabled}
        aria-label="Knob demo"
      />
      <span className="text-sm font-mono" style={{ color: "#555" }}>
        Value: {value}
      </span>
    </div>
  );
}
