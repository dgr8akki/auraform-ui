import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-gauge",
  name: "SoftGauge",
  category: "display",
  description:
    "Semicircular dashboard gauge with needle, arc fill, and optional color segments.",
  importName: "SoftGauge",
  props: [
    {
      name: "value",
      type: "number",
      description: "Current value",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Minimum value",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value",
    },
    {
      name: "label",
      type: "string",
      description: "Label below the value",
    },
    {
      name: "unit",
      type: "string",
      default: '""',
      description: 'Unit suffix (e.g. "%", "°C")',
    },
    {
      name: "size",
      type: "number",
      default: "160",
      description: "Gauge diameter in px",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#4A90D9"',
      description: "Default fill color",
    },
    {
      name: "segments",
      type: "SoftGaugeSegment[]",
      description: "Color breakpoints: { until: number, color: string }[]",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label (falls back to label)",
    },
  ],
  accessibilityNotes:
    'role="meter", aria-valuenow, aria-valuemin, aria-valuemax.',
  relatedComponents: ["soft-progress"],
});
