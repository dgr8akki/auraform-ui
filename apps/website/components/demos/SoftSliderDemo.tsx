"use client";
import { useState } from "react";
import { SoftSlider } from "@auraform/react";

export default function SoftSliderDemo() {
  const [accentColor, setAccentColor] = useState("#4A90D9");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [step, setStep] = useState(1);
  const [width, setWidth] = useState(250);
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
          Min
          <input
            type="number"
            value={min}
            onChange={e => setMin(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm w-16"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Max
          <input
            type="number"
            value={max}
            onChange={e => setMax(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm w-16"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Step
          <input
            type="number"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm w-16"
            min={1}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Width: {width}px
          <input type="range" min={100} max={400} value={width} onChange={e => setWidth(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Disabled
          <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
        </label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <SoftSlider
          value={value}
          onChange={setValue}
          min={min}
          max={max}
          step={step}
          width={width}
          accentColor={accentColor}
          disabled={disabled}
          aria-label="Demo slider"
        />
        <span className="text-sm font-mono" style={{ color: "#555", minWidth: 40 }}>
          {value}
        </span>
      </div>
    </div>
  );
}
