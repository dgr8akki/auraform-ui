"use client";
import { useState } from "react";
import { SoftVerticalSlider } from "@auraform/react";

export default function SoftVerticalSliderDemo() {
  const [accentColor, setAccentColor] = useState("#4A90D9");
  const [height, setHeight] = useState(200);
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
          Height: {height}px
          <input type="range" min={100} max={400} value={height} onChange={e => setHeight(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Disabled
          <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
        </label>
      </div>
      <SoftVerticalSlider
        value={value}
        onChange={setValue}
        height={height}
        accentColor={accentColor}
        disabled={disabled}
        aria-label="Vertical slider demo"
      />
      <span className="text-sm font-mono" style={{ color: "#555" }}>
        Value: {value}
      </span>
    </div>
  );
}
