"use client";
import { useState } from "react";
import { SoftRating } from "@auraform/react";

export default function SoftRatingDemo() {
  const [value, setValue] = useState(3);
  const [accentColor, setAccentColor] = useState("#F5A623");
  const [max, setMax] = useState(5);
  const [size, setSize] = useState(32);
  const [readOnly, setReadOnly] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <label className="flex items-center gap-2">
          Color <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
        </label>
        <label className="flex items-center gap-2">
          Max: {max} <input type="range" min={3} max={10} value={max} onChange={e => setMax(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          Size: {size} <input type="range" min={16} max={48} value={size} onChange={e => setSize(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={readOnly} onChange={e => setReadOnly(e.target.checked)} /> Read Only
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} /> Disabled
        </label>
      </div>
      <div className="flex items-center gap-4">
        <SoftRating
          value={value}
          onChange={setValue}
          accentColor={accentColor}
          max={max}
          size={size}
          readOnly={readOnly}
          disabled={disabled}
          aria-label="Rating"
        />
        <span className="text-sm font-mono">{value}/{max}</span>
      </div>
    </div>
  );
}
