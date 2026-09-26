import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevWorkstation — one console for the whole build",
  description:
    "DevWorkstation is a local, offline-first developer suite for Windows: CV builder, PDF studio, code analyzer, code editor, database lab, test lab, server manager, and more — one install, your data stays on your machine.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body bg-ink text-text antialiased">{children}</body>
    </html>
  );
}
