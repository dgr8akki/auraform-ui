"use client";
import { useState } from "react";
import { FocusRing } from "@auraform/react";

export default function FocusRingDemo() {
  const [visible, setVisible] = useState(true);
  const [color, setColor] = useState("#4A90D9");
  const [width, setWidth] = useState(2);
  const [offset, setOffset] = useState(3);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 text-sm">
          Visible
          <input type="checkbox" checked={visible} onChange={e => setVisible(e.target.checked)} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Color
          <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Width: {width}px
          <input type="range" min={1} max={6} value={width} onChange={e => setWidth(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Offset: {offset}px
          <input type="range" min={0} max={10} value={offset} onChange={e => setOffset(Number(e.target.value))} />
        </label>
      </div>
      <div
        style={{
          position: "relative",
          width: 120,
          height: 60,
          borderRadius: 12,
          background: "#e0e0e0",
          boxShadow: "4px 4px 8px #bebebe, -4px -4px 8px #ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="text-sm">Focus me</span>
        <FocusRing visible={visible} color={color} width={width} offset={offset} borderRadius={12} />
      </div>
    </div>
  );
}
