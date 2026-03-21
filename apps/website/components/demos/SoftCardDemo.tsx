"use client";
import { useState } from "react";
import { SoftCard } from "@auraform/react";

export default function SoftCardDemo() {
  const [elevation, setElevation] = useState<"flat" | "low" | "medium" | "high">("low");
  const [borderRadius, setBorderRadius] = useState(12);
  const [interactive, setInteractive] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <label className="flex items-center gap-2">
          Elevation
          <select
            value={elevation}
            onChange={e => setElevation(e.target.value as "flat" | "low" | "medium" | "high")}
            className="border rounded px-2 py-1"
          >
            <option value="flat">Flat</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          Radius: {borderRadius}px
          <input type="range" min={0} max={32} value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={interactive} onChange={e => setInteractive(e.target.checked)} /> Interactive
        </label>
      </div>
      <SoftCard
        elevation={elevation}
        borderRadius={borderRadius}
        interactive={interactive}
        header="Card Title"
        footer={<span className="text-xs text-gray-500">Last updated just now</span>}
      >
        <p className="text-sm text-gray-700">
          This is the card body content. It can contain any elements you need, including text, images, and other components.
        </p>
      </SoftCard>
    </div>
  );
}
