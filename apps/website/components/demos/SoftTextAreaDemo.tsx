"use client";
import { useState } from "react";
import { SoftTextArea } from "@auraform/react";

export default function SoftTextAreaDemo() {
  const [accentColor, setAccentColor] = useState("#4A90D9");
  const [borderRadius, setBorderRadius] = useState(12);
  const [autoResize, setAutoResize] = useState(false);

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
        <label className="flex items-center gap-2 text-sm">
          Auto Resize
          <input type="checkbox" checked={autoResize} onChange={e => setAutoResize(e.target.checked)} />
        </label>
      </div>
      <SoftTextArea
        accentColor={accentColor}
        borderRadius={borderRadius}
        autoResize={autoResize}
        placeholder="Write your thoughts here..."
        rows={4}
      />
    </div>
  );
}
