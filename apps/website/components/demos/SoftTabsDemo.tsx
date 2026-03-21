"use client";
import { useState } from "react";
import { SoftTabs, SoftTabList, SoftTab, SoftTabPanel } from "@auraform/react";

export default function SoftTabsDemo() {
  const [accentColor, setAccentColor] = useState("#6366F1");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <label className="flex items-center gap-2">
          Color <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
        </label>
      </div>
      <SoftTabs defaultValue="overview">
        <SoftTabList aria-label="Demo tabs">
          <SoftTab value="overview" accentColor={accentColor}>Overview</SoftTab>
          <SoftTab value="features" accentColor={accentColor}>Features</SoftTab>
          <SoftTab value="pricing" accentColor={accentColor}>Pricing</SoftTab>
        </SoftTabList>
        <SoftTabPanel value="overview">
          <div className="p-4 text-sm">
            <h3 className="font-semibold mb-2">Overview</h3>
            <p>Welcome to the product overview. Here you will find a summary of all the key features and benefits.</p>
          </div>
        </SoftTabPanel>
        <SoftTabPanel value="features">
          <div className="p-4 text-sm">
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Soft, modern design system</li>
              <li>Fully accessible components</li>
              <li>Customizable accent colors</li>
            </ul>
          </div>
        </SoftTabPanel>
        <SoftTabPanel value="pricing">
          <div className="p-4 text-sm">
            <h3 className="font-semibold mb-2">Pricing</h3>
            <p>Free and open source. Use it in any project.</p>
          </div>
        </SoftTabPanel>
      </SoftTabs>
    </div>
  );
}
