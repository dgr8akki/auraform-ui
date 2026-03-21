export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    title: "Getting Started",
    href: "/docs/getting-started",
  },
  {
    title: "Theming",
    href: "/docs/theming",
  },
  {
    title: "Accessibility",
    href: "/docs/accessibility",
  },
  {
    title: "Core API",
    href: "/docs/core-api",
  },
  {
    title: "Components",
    href: "/docs/components",
    items: [
      { title: "AuraformProvider", href: "/docs/components/auraform-provider" },
      { title: "Surface", href: "/docs/components/surface" },
      { title: "SoftButton", href: "/docs/components/soft-button" },
      { title: "SoftInput", href: "/docs/components/soft-input" },
      { title: "SoftTextArea", href: "/docs/components/soft-text-area" },
      { title: "SoftCheckbox", href: "/docs/components/soft-checkbox" },
      { title: "SoftRadio", href: "/docs/components/soft-radio" },
      { title: "SoftSwitch", href: "/docs/components/soft-switch" },
      { title: "SoftSlider", href: "/docs/components/soft-slider" },
      {
        title: "SoftVerticalSlider",
        href: "/docs/components/soft-vertical-slider",
      },
      { title: "SoftKnob", href: "/docs/components/soft-knob" },
      { title: "SoftStepper", href: "/docs/components/soft-stepper" },
      { title: "SoftRating", href: "/docs/components/soft-rating" },
      {
        title: "SoftSegmentedControl",
        href: "/docs/components/soft-segmented-control",
      },
      { title: "SoftCard", href: "/docs/components/soft-card" },
      { title: "SoftProgress", href: "/docs/components/soft-progress" },
      { title: "SoftChip", href: "/docs/components/soft-chip" },
      { title: "SoftGauge", href: "/docs/components/soft-gauge" },
      { title: "SoftBadge", href: "/docs/components/soft-badge" },
      { title: "SoftAvatar", href: "/docs/components/soft-avatar" },
      { title: "SoftDivider", href: "/docs/components/soft-divider" },
      { title: "SoftTabs", href: "/docs/components/soft-tabs" },
      { title: "SoftIconButton", href: "/docs/components/soft-icon-button" },
      { title: "SoftTooltip", href: "/docs/components/soft-tooltip" },
    ],
  },
  {
    title: "React Native",
    href: "/docs/react-native",
  },
];
