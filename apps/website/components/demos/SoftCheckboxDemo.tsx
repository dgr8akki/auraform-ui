"use client";
import { useState } from "react";
import { SoftCheckbox } from "@auraform/react";

export default function SoftCheckboxDemo() {
  const [accentColor, setAccentColor] = useState("#4A90D9");
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState("Accept terms");
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
        <label className="flex items-center gap-2 text-sm">
          Label
          <input
            type="text"
            value={label}
            onChange={e => setLabel(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-40"
          />
        </label>
      </div>
      <SoftCheckbox
        checked={checked}
        onChange={setChecked}
        accentColor={accentColor}
        disabled={disabled}
        label={label}
      />
      <p className="text-sm mt-3" style={{ color: "#555" }}>
        Checked: {String(checked)}
      </p>
    </div>
  );
}
