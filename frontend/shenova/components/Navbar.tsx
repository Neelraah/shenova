"use client";

import Link from "next/link";
import { Github } from "lucide-react";

const navItems = [
  { label: "Workflow", href: "/#workflow" },
  { label: "Architecture", href: "/#architecture" },
  { label: "Metrics", href: "/#metrics" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-transparent/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">

        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden border border-white/15">
            <span className="text-sm font-bold tracking-[-0.08em] text-white">
              S
            </span>

            <div className="absolute inset-0 bg-violet-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <div>
            <div className="text-sm font-bold tracking-[0.28em] text-white">
              SHENOVA
            </div>

            <div className="hidden font-mono text-[7px] tracking-[0.25em] text-zinc-600 sm:block">
              PRIVATE INTELLIGENCE
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* GitHub */}
        <a
          href="https://github.com/Neelraah/shenova"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 border border-white/[0.08] px-3 py-2 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]"
        >
          <Github
            size={14}
            strokeWidth={1.5}
            className="text-zinc-500 transition-colors group-hover:text-white"
          />

          <span className="hidden font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white sm:block">
            Source
          </span>
        </a>
      </div>
    </header>
  );
}