"use client";
import { useState } from "react";
import { SoftChip } from "@auraform/react";

export default function SoftChipDemo() {
  const [accentColor, setAccentColor] = useState("#8B5CF6");
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(false);
  const [chips, setChips] = useState(["React", "Vue", "Svelte"]);

  const removeChip = (chip: string) => {
    setChips(prev => prev.filter(c => c !== chip));
  };

  const resetChips = () => {
    setChips(["React", "Vue", "Svelte"]);
  };

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
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 mb-2">Selectable chip</p>
          <SoftChip
            label="Toggle me"
            selectable
            selected={selected}
            onSelect={setSelected}
            accentColor={accentColor}
            disabled={disabled}
          />
          <span className="ml-2 text-sm font-mono">{selected ? "selected" : "unselected"}</span>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-2">Removable chips</p>
          <div className="flex flex-wrap gap-2">
            {chips.map(chip => (
              <SoftChip
                key={chip}
                label={chip}
                removable
                onRemove={() => removeChip(chip)}
                accentColor={accentColor}
                disabled={disabled}
              />
            ))}
            {chips.length === 0 && (
              <button onClick={resetChips} className="text-xs text-blue-500 underline">
                Reset chips
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
