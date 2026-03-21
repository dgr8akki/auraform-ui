"use client";
import { useState } from "react";
import { SoftSegmentedControl } from "@auraform/react";

export default function SoftSegmentedControlDemo() {
  const [selected, setSelected] = useState("week");
  const [accentColor, setAccentColor] = useState("#6366F1");
  const [disabled, setDisabled] = useState(false);

  const options = [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <label className="flex items-center gap-2">
          Color <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} /> Disabled
        </label>
      </div>
      <SoftSegmentedControl
        options={options}
        value={selected}
        onChange={setSelected}
        accentColor={accentColor}
        disabled={disabled}
      />
      <p className="text-sm font-mono">Selected: {selected}</p>
    </div>
  );
}
