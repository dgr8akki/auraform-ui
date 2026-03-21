"use client";
import { useState } from "react";
import { SoftInput } from "@auraform/react";

export default function SoftInputDemo() {
  const [accentColor, setAccentColor] = useState("#4A90D9");
  const [borderRadius, setBorderRadius] = useState(12);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 text-sm">
          Accent Color
          <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Border Radius: {borderRadius}px
          <input type="range" min={0} max={24} value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} />
        </label>
      </div>
      <SoftInput
        accentColor={accentColor}
        borderRadius={borderRadius}
        placeholder="Type something here..."
      />
    </div>
  );
}
