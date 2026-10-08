"use client";

import { useState } from "react";
import DashboardHome from "./dashboard/DashboardHome";
import NewAnalysis from "./dashboard/NewAnalysis";
import AnalysisProgress from "./dashboard/AnalysisProgress";
import AnalysisResults from "./dashboard/AnalysisResults";
import AnalysisHistory from "./dashboard/AnalysisHistory";
import ModelLibrary from "./dashboard/ModelLibrary";
import Reports from "./dashboard/Reports";
import Encryption from "./dashboard/Encryption";
import Settings from "./dashboard/Settings";


type Page =
  | "dashboard"
  | "analysis"
  | "progress"
  | "results"
  | "history"
  | "models"
  | "reports"
  | "encryption"
  | "settings";

const navSections = [
  {
    label: "OVERVIEW",
    items: [
      { id: "dashboard" as Page, label: "Dashboard", icon: "⌂" },
    ],
  },
  {
    label: "ANALYSIS",
    items: [
      { id: "analysis" as Page, label: "New Analysis", icon: "+" },
      { id: "history" as Page, label: "Analysis History", icon: "◷" },
    ],
  },
  {
    label: "MODELS",
    items: [
      { id: "models" as Page, label: "Model Library", icon: "◇" },
    ],
  },
  {
    label: "RESULTS",
    items: [
      { id: "reports" as Page, label: "Reports", icon: "▤" },
    ],
  },
  {
    label: "SECURITY",
    items: [
      { id: "encryption" as Page, label: "Encryption", icon: "◈" },
    ],
  },
];

export default function Dashboard() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = (page: Page) => {
    setActivePage(page);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* ------------------------------------------------
          SUBTLE SHENOVA FACE BACKGROUND
      ------------------------------------------------ */}
      {/* SHENOVA Background Face */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  <img
    src="/shenova-face.png"
    alt=""
    className="
      absolute
      right-[-80px]
      top-[70px]
      h-[620px]
      w-[620px]
      object-contain
      opacity-[0.32]
      mix-blend-screen
    "
  />

  {/* Soft dark overlay so content stays readable */}
  <div className="absolute inset-0 bg-black/20" />
</div>

      {/* ------------------------------------------------
          BACKGROUND GLOW
      ------------------------------------------------ */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.045),transparent_30%)]
        "
      />

      {/* ------------------------------------------------
          MOBILE OVERLAY
      ------------------------------------------------ */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="
            fixed
            inset-0
            z-30
            hidden
            bg-black/60
            backdrop-blur-sm
            md:hidden
          "
        />
      )}

      {/* ------------------------------------------------
          SIDEBAR
      ------------------------------------------------ */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-40
          flex
          h-screen
          w-[255px]
          flex-col
          border-r
          border-white/[0.08]
          bg-[#070707]/95
          backdrop-blur-xl
          transition-transform
          duration-300
          md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-[82px] items-center border-b border-white/[0.08] px-6">
          <button
            onClick={() => navigate("dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06]">
              <span className="text-sm font-semibold tracking-widest">
                S
              </span>
            </div>

            <div className="text-left">
              <div className="text-[15px] font-semibold tracking-[0.22em]">
                SHENOVA
              </div>

              <div className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                Secure Healthcare AI
              </div>
            </div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          {navSections.map((section) => (
            <div key={section.label} className="mb-7">
              <p className="mb-2 px-3 text-[9px] font-medium tracking-[0.2em] text-zinc-600">
                {section.label}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = activePage === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`
                        group
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-left
                        text-sm
                        transition-all
                        ${
                          active
                            ? "bg-white/[0.08] text-white"
                            : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
                        }
                      `}
                    >
                      <span
                        className={`
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          border
                          text-xs
                          transition
                          ${
                            active
                              ? "border-white/15 bg-white/[0.08] text-white"
                              : "border-transparent text-zinc-600 group-hover:text-zinc-300"
                          }
                        `}
                      >
                        {item.icon}
                      </span>

                      <span>{item.label}</span>

                      {active && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-white/[0.08] p-3">
          <button
            onClick={() => navigate("settings")}
            className={`
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-sm
              transition
              ${
                activePage === "settings"
                  ? "bg-white/[0.08] text-white"
                  : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
              }
            `}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg text-xs">
              ⚙
            </span>

            Settings
          </button>

          <div className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xs">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-zinc-300">
                Administrator
              </p>

              <p className="truncate text-[10px] text-zinc-600">
                Hospital Admin
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------
          MAIN AREA
      ------------------------------------------------ */}
      <main
        className={`
          relative
          z-10
          min-h-screen
          transition-all
          duration-300
          md:ml-[255px]
        `}
      >
        {/* Top bar */}
        <header
          className="
            sticky
            top-0
            z-20
            flex
            h-[72px]
            items-center
            justify-between
            border-b
            border-white/[0.07]
            bg-[#050505]/80
            px-5
            backdrop-blur-xl
            md:px-8
          "
        >
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-white/10
                bg-white/[0.04]
                text-zinc-400
                md:hidden
              "
              aria-label="Open sidebar"
            >
              ☰
            </button>

            <div className="hidden text-xs text-zinc-600 sm:block">
              SHENOVA /{" "}
              <span className="text-zinc-400">
                {getPageLabel(activePage)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Security indicator */}
            <div
              className="
                hidden
                items-center
                gap-2
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.03]
                px-3
                py-1.5
                sm:flex
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                Secure Environment
              </span>
            </div>

            {/* User */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xs text-zinc-300">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="mx-auto max-w-[1500px] px-5 py-7 md:px-8 md:py-9">
          {activePage === "dashboard" && (
            <DashboardHome
              onStartAnalysis={() => navigate("analysis")}
            />
          )}

          {activePage === "analysis" && (
          <NewAnalysis
            onAnalysisStart={() => navigate("progress")}
          />
        )}

        {activePage === "progress" && (
          <AnalysisProgress
            onComplete={() => navigate("results")}
          />
        )}

        {activePage === "results" && (
          <AnalysisResults
            onBackToHistory={() => navigate("history")}
            onNewAnalysis={() => navigate("analysis")}
          />
        )}
        {activePage === "history" && (
            <AnalysisHistory
              onViewResults={() => navigate("results")}
              onNewAnalysis={() => navigate("analysis")}
            />
          )}

          {activePage === "models" && (
            <ModelLibrary
              onUseModel={() => navigate("analysis")}
            />
          )}

          {activePage === "reports" && (
              <Reports
                onViewResults={() => navigate("results")}
              />
            )}

        {activePage === "encryption" && (
  <Encryption
    onStartAnalysis={() => navigate("analysis")}
  />
)}

         {activePage === "settings" && <Settings />}
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------------
   PAGE LABEL
------------------------------------------------ */

function getPageLabel(page: Page) {
  const labels: Record<Page, string> = {
    dashboard: "Dashboard",
    analysis: "New Analysis",
    progress: "Analysis Progress",
    results: "Analysis Results",
    history: "Analysis History",
    models: "Model Library",
    reports: "Reports",
    encryption: "Encryption",
    settings: "Settings",
  };

  return labels[page];
}

/* ------------------------------------------------
   TEMPORARY PLACEHOLDER
   We will replace these one by one.
------------------------------------------------ */

function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[65vh] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-xl text-zinc-500">
          ◇
        </div>

        <h1 className="mt-5 text-2xl font-semibold text-white">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          {description}
        </p>

        <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-zinc-600">
          Coming next
        </div>
      </div>
    </div>
  );
}