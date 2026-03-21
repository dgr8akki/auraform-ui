import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Auraform UI — Accessibility-First Neumorphic Components",
    template: "%s | Auraform UI",
  },
  description:
    "An accessibility-first neumorphic React component library with automatic contrast safety, dual-signaling, and one-color theming.",
  keywords: [
    "neumorphic",
    "react",
    "components",
    "accessibility",
    "a11y",
    "UI library",
    "design system",
  ],
  openGraph: {
    title: "Auraform UI",
    description: "Accessibility-first neumorphic React components",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('auraform-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans bg-[#e0e0e0] text-[#333] dark:bg-[#2d2d2d] dark:text-[#f0f0f0] antialiased">
        {children}
      </body>
    </html>
  );
}
