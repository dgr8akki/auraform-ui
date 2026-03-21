"use client";
import { useState } from "react";
import { SoftAvatar } from "@auraform/react";

export default function SoftAvatarDemo() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [shape, setShape] = useState<"circle" | "rounded">("circle");
  const [fallback, setFallback] = useState("AB");
  const [showImage, setShowImage] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <label className="flex items-center gap-2">
          Size
          <select
            value={size}
            onChange={e => setSize(e.target.value as "sm" | "md" | "lg")}
            className="border rounded px-2 py-1"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          Shape
          <select
            value={shape}
            onChange={e => setShape(e.target.value as "circle" | "rounded")}
            className="border rounded px-2 py-1"
          >
            <option value="circle">Circle</option>
            <option value="rounded">Rounded</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          Fallback text
          <input
            type="text"
            value={fallback}
            onChange={e => setFallback(e.target.value)}
            className="border rounded px-2 py-1 w-20"
            maxLength={3}
          />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={showImage} onChange={e => setShowImage(e.target.checked)} /> Show Image
        </label>
      </div>
      <div className="flex items-center gap-6 p-4">
        <div className="text-center space-y-1">
          <SoftAvatar
            size={size}
            shape={shape}
            src={showImage ? "https://i.pravatar.cc/150?img=32" : undefined}
            fallback={fallback}
          />
          <p className="text-xs text-gray-500">{showImage ? "With image" : "Fallback"}</p>
        </div>
        <div className="text-center space-y-1">
          <SoftAvatar
            size={size}
            shape={shape}
            fallback={fallback}
          />
          <p className="text-xs text-gray-500">Fallback only</p>
        </div>
      </div>
    </div>
  );
}
