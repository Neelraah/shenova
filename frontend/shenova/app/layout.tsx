import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHENOVA | Privacy-Preserving AI",
  description:
    "Constraint-aware optimization for homomorphic encryption compatible AI models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}