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
      {
        id: "dashboard" as Page,
        label: "Dashboard",
        icon: "⌂",
      },
    ],
  },
  {
    label: "ANALYSIS",
    items: [
      {
        id: "analysis" as Page,
        label: "New Analysis",
        icon: "+",
      },
      {
        id: "history" as Page,
        label: "Analysis History",
        icon: "◷",
      },
    ],
  },
  {
    label: "MODELS",
    items: [
      {
        id: "models" as Page,
        label: "Model Library",
        icon: "◇",
      },
    ],
  },
  {
    label: "RESULTS",
    items: [
      {
        id: "reports" as Page,
        label: "Reports",
        icon: "▤",
      },
    ],
  },
  {
    label: "SECURITY",
    items: [
      {
        id: "encryption" as Page,
        label: "Encryption",
        icon: "◈",
      },
    ],
  },
];

export default function Dashboard() {
  const [activePage, setActivePage] =
    useState<Page>("dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  /* ------------------------------------------------
     NAVIGATION
  ------------------------------------------------ */

  const navigate = (page: Page) => {
    setActivePage(page);
  };

  return (
    <div className="shenova-dashboard">
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="shenova-background">
        <img
          src="/shenova-face.png"
          alt=""
          className="shenova-face"
        />

        <div className="shenova-background-overlay" />

        <div className="shenova-radial-glow" />
      </div>

      {/* =================================================
          MOBILE SIDEBAR OVERLAY
      ================================================= */}

      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="shenova-mobile-overlay"
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`shenova-sidebar ${
          sidebarOpen
            ? "sidebar-open"
            : "sidebar-closed"
        }`}
      >
        {/* Logo */}

        <div className="shenova-sidebar-header">
          <button
            onClick={() => navigate("dashboard")}
            className="shenova-logo-button"
          >
            <div className="shenova-logo-mark">
              S
            </div>

            <div className="shenova-logo-text">
              <div className="shenova-logo-name">
                SHENOVA
              </div>

              <div className="shenova-logo-subtitle">
                Secure Healthcare AI
              </div>
            </div>
          </button>
        </div>

        {/* Navigation */}

        <nav className="shenova-sidebar-nav">
          {navSections.map((section) => (
            <div
              key={section.label}
              className="shenova-nav-section"
            >
              <p className="shenova-nav-label">
                {section.label}
              </p>

              <div className="shenova-nav-items">
                {section.items.map((item) => {
                  const active =
                    activePage === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`shenova-nav-item ${
                        active ? "active" : ""
                      }`}
                    >
                      <span className="shenova-nav-icon">
                        {item.icon}
                      </span>

                      <span>
                        {item.label}
                      </span>

                      {active && (
                        <span className="shenova-nav-dot" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}

        <div className="shenova-sidebar-bottom">
          <button
            onClick={() =>
              navigate("settings")
            }
            className={`shenova-settings-button ${
              activePage === "settings"
                ? "active"
                : ""
            }`}
          >
            <span className="shenova-settings-icon">
              ⚙
            </span>

            Settings
          </button>

          <div className="shenova-user">
            <div className="shenova-user-avatar">
              A
            </div>

            <div className="shenova-user-info">
              <p>Administrator</p>

              <span>
                Hospital Admin
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="shenova-main">
        {/* =================================================
            TOP NAVBAR
        ================================================= */}

        <header className="shenova-navbar">
          <div className="shenova-navbar-left">
            {/* Mobile menu */}

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="shenova-mobile-menu"
              aria-label="Open sidebar"
            >
              ☰
            </button>

            <div className="shenova-breadcrumb">
              SHENOVA /{" "}
              <span>
                {getPageLabel(activePage)}
              </span>
            </div>
          </div>

          <div className="shenova-navbar-right">
            {/* Security */}

            <div className="shenova-security">
              <span className="shenova-security-dot" />

              <span>
                Secure Environment
              </span>
            </div>

            {/* User */}

            <div className="shenova-navbar-avatar">
              A
            </div>
          </div>
        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <div className="shenova-page-content">
          {activePage === "dashboard" && (
            <DashboardHome
              onStartAnalysis={() =>
                navigate("analysis")
              }
            />
          )}

          {activePage === "analysis" && (
            <NewAnalysis
              onAnalysisStart={() =>
                navigate("progress")
              }
            />
          )}

          {activePage === "progress" && (
            <AnalysisProgress
              onComplete={() =>
                navigate("results")
              }
            />
          )}

          {activePage === "results" && (
            <AnalysisResults
              onBackToHistory={() =>
                navigate("history")
              }
              onNewAnalysis={() =>
                navigate("analysis")
              }
            />
          )}

          {activePage === "history" && (
            <AnalysisHistory
              onViewResults={() =>
                navigate("results")
              }
              onNewAnalysis={() =>
                navigate("analysis")
              }
            />
          )}

          {activePage === "models" && (
            <ModelLibrary
              onUseModel={() =>
                navigate("analysis")
              }
            />
          )}

          {activePage === "reports" && (
            <Reports
              onViewResults={() =>
                navigate("results")
              }
            />
          )}

          {activePage === "encryption" && (
            <Encryption
              onStartAnalysis={() =>
                navigate("analysis")
              }
            />
          )}

          {activePage === "settings" && (
            <Settings />
          )}
        </div>
      </main>
    </div>
  );
}

/* =================================================
   PAGE LABEL
================================================= */

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