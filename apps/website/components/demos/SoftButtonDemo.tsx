"use client";
import { useState } from "react";
import { SoftButton } from "@auraform/react";

type Elevation = "flat" | "low" | "medium" | "high";

export default function SoftButtonDemo() {
  const [elevation, setElevation] = useState<Elevation>("medium");
  const [variant, setVariant] = useState<"default" | "primary">("default");
  const [accentColor, setAccentColor] = useState("#4A90D9");
  const [borderRadius, setBorderRadius] = useState(12);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 text-sm">
          Elevation
          <select
            value={elevation}
            onChange={e => setElevation(e.target.value as Elevation)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="flat">flat</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          Variant
          <select
            value={variant}
            onChange={e => setVariant(e.target.value as "default" | "primary")}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="default">default</option>
            <option value="primary">primary</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          Accent Color
          <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Border Radius: {borderRadius}px
          <input type="range" min={0} max={32} value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Disabled
          <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
        </label>
      </div>
      <SoftButton
        elevation={elevation}
        variant={variant}
        accentColor={accentColor}
        borderRadius={borderRadius}
        disabled={disabled}
      >
        Click Me
      </SoftButton>
    </div>
  );
}
