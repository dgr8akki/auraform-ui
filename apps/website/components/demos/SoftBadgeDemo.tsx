"use client";
import { useState } from "react";
import { SoftBadge } from "@auraform/react";

export default function SoftBadgeDemo() {
  const [count, setCount] = useState(5);
  const [max, setMax] = useState(99);
  const [dot, setDot] = useState(false);
  const [color, setColor] = useState("#EF4444");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <label className="flex items-center gap-2">
          Count: {count}
          <input type="range" min={0} max={120} value={count} onChange={e => setCount(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          Max
          <input
            type="number"
            value={max}
            onChange={e => setMax(Number(e.target.value))}
            className="border rounded px-2 py-1 w-20"
          />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={dot} onChange={e => setDot(e.target.checked)} /> Dot Mode
        </label>
        <label className="flex items-center gap-2">
          Color <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        </label>
      </div>
      <div className="flex items-center gap-8 p-4">
        <SoftBadge count={count} max={max} dot={dot} color={color}>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium">
            Notifications
          </button>
        </SoftBadge>
        <SoftBadge count={count} max={max} dot={dot} color={color}>
          <span className="text-2xl">📬</span>
        </SoftBadge>
      </div>
    </div>
  );
}
