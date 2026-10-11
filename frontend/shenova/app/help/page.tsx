"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Upload,
  FileCheck2,
  BrainCircuit,
  KeyRound,
  BarChart3,
  FileText,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";

const sections = [
  { id: "getting-started", label: "Getting Started" },
  { id: "upload", label: "Upload Dataset" },
  { id: "validate", label: "Validate Dataset" },
  { id: "model", label: "Select a Model" },
  { id: "analysis", label: "Run Secure Analysis" },
  { id: "results", label: "View Results" },
  { id: "reports", label: "Generate Reports" },
  { id: "security", label: "Security" },
  { id: "models", label: "Approved Models" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "faq", label: "FAQ" },
];

const workflow = [
  {
    number: "01",
    title: "Upload Dataset",
    description:
      "Upload a healthcare dataset in the supported CSV format.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Validate Dataset",
    description:
      "SHENOVA checks the uploaded dataset before analysis.",
    icon: FileCheck2,
  },
  {
    number: "03",
    title: "Select Approved Model",
    description:
      "Choose an approved HE-compatible model for the analysis.",
    icon: BrainCircuit,
  },
  {
    number: "04",
    title: "Secure Analysis",
    description:
      "The analysis workflow encrypts the input before secure inference.",
    icon: Lock,
  },
  {
    number: "05",
    title: "Authorize Decryption",
    description:
      "Authorize access to the final result after encrypted computation.",
    icon: KeyRound,
  },
  {
    number: "06",
    title: "Review Results",
    description:
      "View the final prediction, confidence, and analysis metadata.",
    icon: BarChart3,
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="text-sm font-medium text-zinc-200">
          {question}
        </span>

        <ChevronDown
          size={16}
          className={`shrink-0 text-zinc-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="pb-5 pr-10 text-sm leading-7 text-zinc-500">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* =========================================================
          SHENOVA BACKGROUND FACE
      ========================================================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        {/* Face */}
        <div className="absolute right-[-120px] top-[90px] h-[650px] w-[650px] opacity-[0.22]">
          <img
            src="/shenova-face.png"
            alt=""
            className="h-full w-full object-contain mix-blend-screen"
          />

          {/* Edge fades */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        </div>

        {/* Overall readability layer */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="relative z-20 border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
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
                USER MANUAL
              </div>
            </div>
          </Link>

          {/* Dashboard */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 border border-white/[0.08] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
          >
            Open Dashboard
            <ArrowRight size={12} />
          </Link>
        </div>
      </header>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-20">

        <div className="grid gap-14 lg:grid-cols-[220px_1fr]">

          {/* =====================================================
              SIDEBAR
          ===================================================== */}
          <aside className="hidden lg:block">
            <div className="sticky top-10">

              <div className="mb-5 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">
                Documentation
              </div>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block border-l border-transparent px-3 py-2 text-sm text-zinc-500 transition-colors hover:border-violet-400/50 hover:text-white"
                  >
                    {section.label}
                  </a>
                ))}
              </nav>

            </div>
          </aside>

          {/* =====================================================
              DOCUMENTATION
          ===================================================== */}
          <div className="max-w-4xl">

            {/* ===================================================
                HERO
            =================================================== */}
            <section
              id="getting-started"
              className="scroll-mt-10"
            >
              <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.35em] text-violet-400">
                SHENOVA USER MANUAL
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                Secure healthcare AI,
                <br />
                <span className="text-zinc-500">
                  step by step.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-500">
                This guide explains how to use SHENOVA to upload a
                healthcare dataset, select an approved model, run a
                privacy-preserving analysis, and review the final result.
              </p>

              {/* Prototype notice */}
              <div className="mt-8 flex gap-4 border border-violet-400/20 bg-violet-400/[0.04] p-5">

                <AlertTriangle
                  size={18}
                  className="mt-0.5 shrink-0 text-violet-300"
                />

                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    Research prototype
                  </p>

                  <p className="mt-2 text-sm leading-7 text-zinc-500">
                    SHENOVA is currently a research and
                    software-engineering prototype. Demonstration
                    datasets are synthetic and are not real patient
                    records. Clinical deployment would require appropriate
                    validation, security controls, regulatory compliance,
                    and integration with healthcare infrastructure.
                  </p>
                </div>

              </div>
            </section>

            {/* ===================================================
                WORKFLOW
            =================================================== */}
            <section className="mt-20">

              <div className="mb-8">
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">
                  Workflow
                </div>

                <h2 className="mt-3 text-2xl font-semibold">
                  Using SHENOVA
                </h2>
              </div>

              <div className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">

                {workflow.map((step) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.number}
                      className="bg-black p-6"
                    >
                      <div className="flex items-start justify-between">

                        <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-700">
                          {step.number}
                        </span>

                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          className="text-zinc-600"
                        />

                      </div>

                      <h3 className="mt-8 text-sm font-medium text-zinc-200">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        {step.description}
                      </p>
                    </div>
                  );
                })}

              </div>
            </section>

            {/* ===================================================
                UPLOAD
            =================================================== */}
            <section
              id="upload"
              className="mt-20 scroll-mt-10"
            >
              <SectionTitle
                number="01"
                title="Upload Dataset"
              />

              <p className="text-sm leading-7 text-zinc-500">
                Start a new analysis from the SHENOVA dashboard and upload
                the dataset that you want to analyze.
              </p>

              <StepList
                items={[
                  "Open New Analysis from the dashboard.",
                  "Choose or upload the supported CSV dataset.",
                  "Confirm that the selected dataset is the one you want to analyze.",
                ]}
              />
            </section>

            {/* ===================================================
                VALIDATE
            =================================================== */}
            <section
              id="validate"
              className="mt-20 scroll-mt-10"
            >
              <SectionTitle
                number="02"
                title="Validate Dataset"
              />

              <p className="text-sm leading-7 text-zinc-500">
                Before secure inference begins, SHENOVA checks whether the
                dataset is suitable for the selected model.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                <InfoCard
                  title="CSV Format"
                  text="Checks that the uploaded file uses the expected dataset format."
                />

                <InfoCard
                  title="Required Features"
                  text="Checks that the required model features are available."
                />

                <InfoCard
                  title="Numeric Values"
                  text="Checks that numerical model inputs can be processed."
                />

                <InfoCard
                  title="Model Compatibility"
                  text="Confirms that the selected model supports the dataset structure."
                />

              </div>
            </section>

            {/* ===================================================
                MODEL
            =================================================== */}
            <section
              id="model"
              className="mt-20 scroll-mt-10"
            >
              <SectionTitle
                number="03"
                title="Select an Approved Model"
              />

              <p className="text-sm leading-7 text-zinc-500">
                SHENOVA does not require the hospital administrator to
                train an AI model. The dashboard consumes approved model
                packages prepared for secure inference.
              </p>

              <div className="mt-6 border border-white/[0.08] p-6">

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 items-center justify-center border border-white/[0.08]">
                    <BrainCircuit
                      size={18}
                      className="text-violet-300"
                    />
                  </div>

                  <div>

                    <h3 className="text-sm font-medium">
                      SHENOVA Breast Cancer Risk Model
                    </h3>

                    <p className="mt-1 text-xs text-zinc-600">
                      Breast Cancer Classification · Version 1.0
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge>CKKS</Badge>
                      <Badge>HE Compatible</Badge>
                      <Badge>Approved</Badge>
                    </div>

                  </div>

                </div>

              </div>
            </section>

            {/* ===================================================
                ANALYSIS
            =================================================== */}
            <section
              id="analysis"
              className="mt-20 scroll-mt-10"
            >
              <SectionTitle
                number="04"
                title="Run Secure Analysis"
              />

              <p className="text-sm leading-7 text-zinc-500">
                Once the dataset and approved model are selected, start
                the secure analysis workflow.
              </p>

              <div className="mt-6 border border-white/[0.08] bg-white/[0.02] p-6">

                <div className="space-y-4">

                  {[
                    "Dataset Validation",
                    "Preprocessing",
                    "CKKS Encryption",
                    "Encrypted Input",
                    "HE-Compatible Model",
                    "Encrypted Inference",
                    "Encrypted Output",
                    "Awaiting Decryption",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-violet-300"
                      />

                      <span className="text-sm text-zinc-400">
                        {item}
                      </span>

                      <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  ))}

                </div>
              </div>

              <p className="mt-5 text-xs leading-6 text-zinc-600">
                In the current MVP, the execution sequence is demonstrated
                in the frontend. The actual CKKS encryption and encrypted
                model inference are intended to be connected to the HE
                backend implementation.
              </p>
            </section>

            {/* ===================================================
                RESULTS
            =================================================== */}
            <section
              id="results"
              className="mt-20 scroll-mt-10"
            >
              <SectionTitle
                number="05"
                title="View Results"
              />

              <p className="text-sm leading-7 text-zinc-500">
                Results are initially presented as protected output.
                Authorized decryption is then required before the final
                prediction is revealed.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                <InfoCard
                  title="Encrypted Output"
                  text="The result remains protected while the analysis workflow is completed."
                />

                <InfoCard
                  title="Authorized Decryption"
                  text="An authorized administrator can reveal the final result."
                />

              </div>

              <div className="mt-6 flex items-center gap-4 border border-white/[0.08] p-5">

                <ShieldCheck
                  size={20}
                  className="text-violet-300"
                />

                <div>

                  <p className="text-sm font-medium text-zinc-300">
                    Patient Data Exposure
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    The intended workflow keeps patient input protected
                    during encrypted computation.
                  </p>

                </div>

              </div>
            </section>

            {/* ===================================================
                REPORTS
            =================================================== */}
            <section
              id="reports"
              className="mt-20 scroll-mt-10"
            >
              <SectionTitle
                number="06"
                title="Generate Reports"
              />

              <p className="text-sm leading-7 text-zinc-500">
                The Reports section provides a structured view of completed
                analyses and their associated results and metadata.
              </p>

              <div className="mt-6 flex items-center gap-4 border border-white/[0.08] p-5">

                <FileText
                  size={20}
                  className="text-zinc-500"
                />

                <div>

                  <p className="text-sm font-medium text-zinc-300">
                    Analysis Report
                  </p>

                  <p className="mt-1 text-xs leading-6 text-zinc-600">
                    Reports contain analysis results and metadata rather
                    than unencrypted patient records.
                  </p>

                </div>

              </div>
            </section>

            {/* ===================================================
                SECURITY
            =================================================== */}
            <section
              id="security"
              className="mt-20 scroll-mt-10"
            >
              <SectionTitle
                number="SEC"
                title="Security Concepts"
              />

              <div className="space-y-8">

                <SecurityBlock
                  title="What is CKKS?"
                  text="CKKS is a homomorphic encryption scheme designed for approximate arithmetic on encrypted numerical data. SHENOVA uses CKKS as the intended encryption scheme for its numerical healthcare AI workflow."
                />

                <SecurityBlock
                  title="What is encrypted inference?"
                  text="Encrypted inference means that the model performs computation on encrypted numerical inputs rather than requiring the underlying input data to be available in plaintext during the intended computation."
                />

                <SecurityBlock
                  title="What does HE Compatible mean?"
                  text="An HE-compatible model is designed so that its operations can be evaluated within the supported homomorphic-encryption environment. SHENOVA's student model uses operations intended to be suitable for encrypted computation."
                />

                <SecurityBlock
                  title="What is Authorized Decryption?"
                  text="Authorized decryption is the controlled step where the protected result is decrypted so that the final analysis output can be viewed."
                />

              </div>
            </section>

            {/* ===================================================
                MODELS
            =================================================== */}
            <section
              id="models"
              className="mt-20 scroll-mt-10"
            >
              <SectionTitle
                number="MOD"
                title="Approved Models"
              />

              <p className="text-sm leading-7 text-zinc-500">
                The current demonstration includes one approved model:
                the SHENOVA Breast Cancer Risk Model.
              </p>

              <div className="mt-6 border border-white/[0.08] p-6">

                <div className="grid gap-5 sm:grid-cols-2">

                  <Detail
                    label="Task"
                    value="Breast Cancer Classification"
                  />

                  <Detail
                    label="Version"
                    value="1.0"
                  />

                  <Detail
                    label="Encryption"
                    value="CKKS"
                  />

                  <Detail
                    label="Status"
                    value="Approved"
                  />

                  <Detail
                    label="Inference"
                    value="Encrypted"
                  />

                  <Detail
                    label="Compatibility"
                    value="HE Compatible"
                  />

                </div>

              </div>

              <p className="mt-5 text-xs leading-6 text-zinc-600">
                Model development is separate from the hospital
                administrator workflow. The dashboard is intended to
                consume approved model packages rather than provide model
                training controls.
              </p>
            </section>

            {/* ===================================================
                TROUBLESHOOTING
            =================================================== */}
            <section
              id="troubleshooting"
              className="mt-20 scroll-mt-10"
            >
              <SectionTitle
                number="TRB"
                title="Troubleshooting"
              />

              <div className="space-y-4">

                <Trouble
                  title="Dataset upload is not accepted"
                  text="Confirm that the selected file is a supported CSV dataset and that the file structure matches the expected model input."
                />

                <Trouble
                  title="The model cannot be selected"
                  text="Check the Model Library and confirm that an approved HE-compatible model is available."
                />

                <Trouble
                  title="The result is still encrypted"
                  text="The analysis must reach the result stage before authorized decryption can be performed."
                />

                <Trouble
                  title="No analysis appears in History"
                  text="Complete the analysis workflow and return to Analysis History. The current prototype stores analysis metadata locally in the browser."
                />

              </div>
            </section>

            {/* ===================================================
                FAQ
            =================================================== */}
            <section
              id="faq"
              className="mt-20 scroll-mt-10"
            >
              <SectionTitle
                number="FAQ"
                title="Frequently Asked Questions"
              />

              <div className="mt-2">

                <FAQItem
                  question="Does SHENOVA use real patient data?"
                  answer="No. The current demonstration uses synthetic healthcare datasets. These datasets are not real patient records."
                />

                <FAQItem
                  question="Does SHENOVA train models from the dashboard?"
                  answer="No. The hospital-facing dashboard consumes approved model packages. Model development and optimization are separate from the administrator workflow."
                />

                <FAQItem
                  question="Why is the result initially encrypted?"
                  answer="The protected result demonstrates the intended privacy-preserving workflow. Authorized decryption is used to reveal the final result."
                />

                <FAQItem
                  question="What happens to uploaded datasets?"
                  answer="The current prototype uses browser-side demonstration data and stores analysis metadata locally. A production implementation would require secure backend storage, access controls, retention policies, and appropriate healthcare privacy and compliance controls."
                />

                <FAQItem
                  question="Is SHENOVA a clinical diagnostic system?"
                  answer="No. SHENOVA is currently a research and software-engineering prototype demonstrating a privacy-preserving AI workflow. It should not be treated as a clinical diagnostic system."
                />

              </div>
            </section>

            {/* ===================================================
                BOTTOM CTA
            =================================================== */}
            <div className="mt-24 border-t border-white/[0.08] pt-10">

              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

                <div>
                  <p className="text-sm font-medium text-zinc-300">
                    Ready to run an analysis?
                  </p>

                  <p className="mt-1 text-xs text-zinc-600">
                    Open the SHENOVA hospital dashboard.
                  </p>
                </div>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 border border-white/[0.12] px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-300 transition-all hover:border-violet-300/30 hover:bg-violet-400/[0.05] hover:text-white"
                >
                  Open Dashboard
                  <ArrowRight size={13} />
                </Link>

              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

/* ===============================================================
   REUSABLE UI COMPONENTS
=============================================================== */

function SectionTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-5">

      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-violet-400">
        {number}
      </div>

      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">
        {title}
      </h2>

    </div>
  );
}

function StepList({
  items,
}: {
  items: string[];
}) {
  return (
    <div className="mt-6 space-y-3">

      {items.map((item, index) => (
        <div
          key={item}
          className="flex items-start gap-3"
        >

          <span className="mt-0.5 font-mono text-[9px] text-zinc-700">
            {String(index + 1).padStart(2, "0")}
          </span>

          <p className="text-sm leading-6 text-zinc-500">
            {item}
          </p>

        </div>
      ))}

    </div>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border border-white/[0.08] p-5">

      <p className="text-sm font-medium text-zinc-300">
        {title}
      </p>

      <p className="mt-2 text-xs leading-6 text-zinc-600">
        {text}
      </p>

    </div>
  );
}

function SecurityBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div>

      <h3 className="text-sm font-medium text-zinc-300">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-zinc-500">
        {text}
      </p>

    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-700">
        {label}
      </p>

      <p className="mt-1 text-sm text-zinc-400">
        {value}
      </p>

    </div>
  );
}

function Badge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="border border-white/[0.08] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.15em] text-zinc-500">
      {children}
    </span>
  );
}

function Trouble({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border border-white/[0.08] p-5">

      <p className="text-sm font-medium text-zinc-300">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-600">
        {text}
      </p>

    </div>
  );
}