"use client";
import { useState } from "react";
import { Surface } from "@auraform/react";

type Elevation = "flat" | "low" | "medium" | "high";

export default function SurfaceDemo() {
  const [elevation, setElevation] = useState<Elevation>("medium");
  const [isInset, setIsInset] = useState(false);
  const [borderRadius, setBorderRadius] = useState(12);

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
          Inset
          <input type="checkbox" checked={isInset} onChange={e => setIsInset(e.target.checked)} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Border Radius: {borderRadius}px
          <input type="range" min={0} max={32} value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} />
        </label>
      </div>
      <Surface elevation={elevation} isInset={isInset} borderRadius={borderRadius}>
        <div style={{ padding: 20, minWidth: 200, textAlign: "center" }}>
          <p className="text-sm">elevation: {elevation}</p>
          <p className="text-sm">isInset: {String(isInset)}</p>
          <p className="text-sm">borderRadius: {borderRadius}px</p>
        </div>
      </Surface>
    </div>
  );
}
