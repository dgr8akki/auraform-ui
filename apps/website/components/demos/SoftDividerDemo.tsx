"use client";
import { useState } from "react";
import { SoftDivider } from "@auraform/react";

export default function SoftDividerDemo() {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [spacing, setSpacing] = useState(16);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <label className="flex items-center gap-2">
          Orientation
          <select
            value={orientation}
            onChange={e => setOrientation(e.target.value as "horizontal" | "vertical")}
            className="border rounded px-2 py-1"
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          Spacing: {spacing}px
          <input type="range" min={0} max={48} value={spacing} onChange={e => setSpacing(Number(e.target.value))} />
        </label>
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-xs text-gray-500 mb-2">Horizontal</p>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm">Content above</p>
            <SoftDivider orientation="horizontal" spacing={spacing} />
            <p className="text-sm">Content below</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-2">Vertical</p>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg h-24">
            <span className="text-sm">Left</span>
            <SoftDivider orientation="vertical" spacing={spacing} />
            <span className="text-sm">Center</span>
            <SoftDivider orientation="vertical" spacing={spacing} />
            <span className="text-sm">Right</span>
          </div>
        </div>
      </div>
    </div>
  );
}
