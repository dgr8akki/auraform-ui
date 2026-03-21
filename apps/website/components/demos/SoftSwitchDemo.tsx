"use client";
import { useState } from "react";
import { SoftSwitch } from "@auraform/react";

export default function SoftSwitchDemo() {
  const [accentColor, setAccentColor] = useState("#4A90D9");
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(false);

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
      <SoftSwitch
        checked={checked}
        onChange={setChecked}
        accentColor={accentColor}
        disabled={disabled}
        aria-label="Toggle switch"
      />
      <span className="text-sm" style={{ color: "#555" }}>
        {checked ? "On" : "Off"}
      </span>
    </div>
  );
}
