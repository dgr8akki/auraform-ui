"use client";
import { useState } from "react";
import { SoftIconButton } from "@auraform/react";

export default function SoftIconButtonDemo() {
  const [elevation, setElevation] = useState<"flat" | "low" | "medium" | "high">("low");
  const [shape, setShape] = useState<"circle" | "square">("circle");
  const [size, setSize] = useState(44);
  const [disabled, setDisabled] = useState(false);

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
          Shape
          <select
            value={shape}
            onChange={e => setShape(e.target.value as "circle" | "square")}
            className="border rounded px-2 py-1"
          >
            <option value="circle">Circle</option>
            <option value="square">Square</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          Size: {size}px
          <input type="range" min={32} max={64} value={size} onChange={e => setSize(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} /> Disabled
        </label>
      </div>
      <div className="flex items-center gap-4 p-4">
        <SoftIconButton elevation={elevation} shape={shape} size={size} disabled={disabled} aria-label="Heart">
          ❤️
        </SoftIconButton>
        <SoftIconButton elevation={elevation} shape={shape} size={size} disabled={disabled} aria-label="Star">
          ⭐
        </SoftIconButton>
        <SoftIconButton elevation={elevation} shape={shape} size={size} disabled={disabled} aria-label="Settings">
          ⚙️
        </SoftIconButton>
        <SoftIconButton elevation={elevation} shape={shape} size={size} disabled={disabled} aria-label="Search">
          🔍
        </SoftIconButton>
      </div>
    </div>
  );
}
