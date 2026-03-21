"use client";
import { useState } from "react";
import { SoftRadioGroup, SoftRadio } from "@auraform/react";

export default function SoftRadioDemo() {
  const [accentColor, setAccentColor] = useState("#4A90D9");
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState("basic");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 text-sm">
          Accent Color
          <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Disabled
          <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
        </label>
      </div>
      <SoftRadioGroup
        name="plan"
        value={selected}
        onChange={setSelected}
        disabled={disabled}
        aria-label="Select a plan"
      >
        <SoftRadio value="basic" label="Basic" accentColor={accentColor} />
        <SoftRadio value="pro" label="Pro" accentColor={accentColor} />
        <SoftRadio value="enterprise" label="Enterprise" accentColor={accentColor} />
      </SoftRadioGroup>
      <p className="text-sm mt-3" style={{ color: "#555" }}>
        Selected: {selected}
      </p>
    </div>
  );
}
