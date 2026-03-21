"use client";
import { useState } from "react";
import { SoftTooltip, SoftButton } from "@auraform/react";

export default function SoftTooltipDemo() {
  const [placement, setPlacement] = useState<"top" | "bottom" | "left" | "right">("top");
  const [delay, setDelay] = useState(200);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <label className="flex items-center gap-2">
          Placement
          <select
            value={placement}
            onChange={e => setPlacement(e.target.value as "top" | "bottom" | "left" | "right")}
            className="border rounded px-2 py-1"
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          Delay: {delay}ms
          <input type="range" min={0} max={1000} step={50} value={delay} onChange={e => setDelay(Number(e.target.value))} />
        </label>
      </div>
      <div className="flex items-center justify-center p-16">
        <SoftTooltip content="This is a tooltip!" placement={placement} delay={delay}>
          <SoftButton>Hover me</SoftButton>
        </SoftTooltip>
      </div>
    </div>
  );
}
