"use client";

import { useEffect, useState } from "react";

interface AnalysisProgressProps {
  onComplete?: () => void;
}

interface AnalysisRecord {
  id: string;
  name: string;
  dataset: string;
  model: string;
  modelVersion: string;
  status: "Processing" | "Completed";
  date: string;
  createdAt: string;
  records: number;
  features: number;
  result: {
    prediction: string;
    confidence: number;
    inferenceTime: string;
  };
  security: {
    encryption: string;
    encryptedInference: boolean;
    patientDataExposure: string;
    modelCompatibility: string;
  };
}

const ANALYSES_KEY = "shenova_analyses";
const CURRENT_ANALYSIS_KEY = "shenova_current_analysis";

const steps = [
  {
    id: 1,
    title: "Dataset Validation",
    description:
      "Checking CSV structure, required features, numeric values, and model compatibility.",
    category: "Validation",
  },
  {
    id: 2,
    title: "Preprocessing",
    description:
      "Preparing the validated healthcare features for secure model inference.",
    category: "Preparation",
  },
  {
    id: 3,
    title: "CKKS Encryption",
    description:
      "Preparing the numerical input for homomorphic encrypted computation.",
    category: "Encryption",
  },
  {
    id: 4,
    title: "Encrypted Input",
    description:
      "Secured input is passed into the privacy-preserving inference pipeline.",
    category: "Protection",
  },
  {
    id: 5,
    title: "HE-Compatible Model",
    description:
      "Loading the approved polynomial student model for encrypted inference.",
    category: "Model",
  },
  {
    id: 6,
    title: "Encrypted Inference",
    description:
      "Running the approved model while keeping the input protected.",
    category: "Inference",
  },
  {
    id: 7,
    title: "Encrypted Output",
    description:
      "The model output remains protected before authorized decryption.",
    category: "Output",
  },
  {
    id: 8,
    title: "Awaiting Decryption",
    description:
      "Final result is ready and remains protected until administrator authorization.",
    category: "Authorization",
  },
];

export default function AnalysisProgress({
  onComplete,
}: AnalysisProgressProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [finished, setFinished] = useState(false);

  /*
   * Simulated secure-analysis pipeline.
   *
   * This frontend MVP demonstrates the intended SHENOVA
   * execution flow. Actual CKKS encryption and encrypted
   * model inference will be connected to the backend later.
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((previous) => {
        if (previous >= steps.length) {
          clearInterval(timer);
          setFinished(true);

          return previous;
        }

        return previous + 1;
      });
    }, 1100);

    return () => clearInterval(timer);
  }, []);

  /*
   * When the simulated pipeline finishes:
   *
   * Processing → Completed
   *
   * The selected analysis is updated in localStorage.
   */
  useEffect(() => {
    if (!finished) {
      return;
    }

    const currentAnalysisId =
      localStorage.getItem(CURRENT_ANALYSIS_KEY);

    if (currentAnalysisId) {
      try {
        const storedAnalyses =
          localStorage.getItem(ANALYSES_KEY);

        if (storedAnalyses) {
          const analyses: AnalysisRecord[] =
            JSON.parse(storedAnalyses);

          const updatedAnalyses = analyses.map(
            (analysis) => {
              if (analysis.id !== currentAnalysisId) {
                return analysis;
              }

              return {
                ...analysis,
                status: "Completed" as const,
              };
            }
          );

          localStorage.setItem(
            ANALYSES_KEY,
            JSON.stringify(updatedAnalyses)
          );
        }
      } catch (error) {
        console.error(
          "Unable to update local analysis:",
          error
        );
      }
    }

    /*
     * Give the administrator a moment to see
     * "Analysis Complete" before opening Results.
     */
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1200);

    return () => clearTimeout(timer);
  }, [finished, onComplete]);

  const progress = finished
    ? 100
    : Math.min(
        ((currentStep - 1) / steps.length) * 100,
        100
      );

  const activeStepIndex = Math.min(
    currentStep - 1,
    steps.length - 1
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <div className="mb-3 flex items-center gap-2">

          <span
            className={`
              h-2
              w-2
              rounded-full
              ${
                finished
                  ? "bg-emerald-400"
                  : "animate-pulse bg-white"
              }
            `}
          />

          <span
            className={`
              text-[10px]
              uppercase
              tracking-[0.2em]
              ${
                finished
                  ? "text-emerald-400"
                  : "text-zinc-500"
              }
            `}
          >
            {finished
              ? "Secure Analysis Complete"
              : "Secure Analysis"}
          </span>

        </div>

        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          {finished
            ? "Analysis Complete"
            : "Analysis in Progress"}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
          SHENOVA is processing the selected healthcare dataset
          through its privacy-preserving analysis pipeline.
        </p>

      </div>

      {/* Main progress card */}

      <section
        className="
          max-w-4xl
          rounded-2xl
          border
          border-white/10
          bg-white/[0.025]
          p-6
          md:p-8
        "
      >

        {/* Status */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
              Current operation
            </p>

            <h2 className="mt-2 text-lg font-medium text-white">

              {finished
                ? "Secure pipeline completed"
                : steps[activeStepIndex].title}

            </h2>

            {!finished && (
              <p className="mt-1 text-xs text-zinc-600">
                {steps[activeStepIndex].description}
              </p>
            )}

          </div>

          <div className="flex items-center gap-2">

            <span
              className={`
                h-2
                w-2
                rounded-full
                ${
                  finished
                    ? "bg-emerald-400"
                    : "animate-pulse bg-white"
                }
              `}
            />

            <span className="text-xs text-zinc-500">

              {finished
                ? "Completed"
                : "Processing"}

            </span>

          </div>

        </div>

        {/* Progress bar */}

        <div className="mt-7">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-[10px] uppercase tracking-wider text-zinc-600">
              Secure pipeline progress
            </span>

            <span className="text-xs text-zinc-400">
              {Math.round(progress)}%
            </span>

          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">

            <div
              className="
                h-full
                rounded-full
                bg-white
                transition-all
                duration-700
              "
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Pipeline */}

        <div className="mt-10">

          <div className="space-y-0">

            {steps.map((step, index) => {

              const completed =
                finished ||
                currentStep > step.id;

              const active =
                currentStep === step.id &&
                !finished;

              return (
                <div key={step.id}>

                  <div className="flex gap-4">

                    {/* Indicator */}

                    <div className="flex flex-col items-center">

                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          text-xs
                          transition-all
                          duration-500

                          ${
                            completed
                              ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-400"
                              : active
                                ? "border-white/25 bg-white/[0.08] text-white"
                                : "border-white/10 bg-white/[0.02] text-zinc-700"
                          }
                        `}
                      >

                        {completed ? (

                          <span className="text-sm">
                            ✓
                          </span>

                        ) : active ? (

                          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />

                        ) : (

                          <span>
                            0{step.id}
                          </span>

                        )}

                      </div>

                      {index !== steps.length - 1 && (

                        <div
                          className={`
                            my-1
                            h-12
                            w-px
                            transition-all
                            duration-500

                            ${
                              completed
                                ? "bg-emerald-400/20"
                                : "bg-white/[0.07]"
                            }
                          `}
                        />

                      )}

                    </div>

                    {/* Content */}

                    <div className="pb-8 pt-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3
                          className={`
                            text-sm
                            font-medium

                            ${
                              completed || active
                                ? "text-white"
                                : "text-zinc-600"
                            }
                          `}
                        >
                          {step.title}
                        </h3>

                        <span
                          className={`
                            rounded-full
                            border
                            px-2
                            py-0.5
                            text-[9px]
                            uppercase
                            tracking-wider

                            ${
                              completed
                                ? "border-emerald-400/10 bg-emerald-400/[0.04] text-emerald-400"
                                : active
                                  ? "border-white/10 bg-white/[0.04] text-zinc-400"
                                  : "border-white/[0.05] bg-white/[0.02] text-zinc-700"
                            }
                          `}
                        >
                          {completed
                            ? "Complete"
                            : active
                              ? "Processing"
                              : "Pending"}
                        </span>

                      </div>

                      <p
                        className={`
                          mt-1
                          max-w-xl
                          text-xs
                          leading-5

                          ${
                            completed || active
                              ? "text-zinc-500"
                              : "text-zinc-700"
                          }
                        `}
                      >
                        {step.description}
                      </p>

                      {/* Validation details */}

                      {step.id === 1 &&
                        (completed || active) && (

                          <div className="mt-4 grid gap-2 sm:grid-cols-2">

                            <ValidationItem
                              label="CSV format"
                              status={
                                completed
                                  ? "Verified"
                                  : "Checking"
                              }
                            />

                            <ValidationItem
                              label="Required features"
                              status={
                                completed
                                  ? "30 detected"
                                  : "Checking"
                              }
                            />

                            <ValidationItem
                              label="Numeric values"
                              status={
                                completed
                                  ? "Verified"
                                  : "Checking"
                              }
                            />

                            <ValidationItem
                              label="Model compatibility"
                              status={
                                completed
                                  ? "Compatible"
                                  : "Checking"
                              }
                            />

                          </div>

                        )}

                      {/* Encryption details */}

                      {step.id === 3 &&
                        (completed || active) && (

                          <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/20 p-3">

                            <div className="flex items-center justify-between">

                              <span className="text-[10px] uppercase tracking-wider text-zinc-600">
                                Homomorphic encryption scheme
                              </span>

                              <span className="text-xs font-medium text-zinc-300">
                                CKKS
                              </span>

                            </div>

                          </div>

                        )}

                      {/* HE inference details */}

                      {step.id === 6 &&
                        (completed || active) && (

                          <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/20 p-3">

                            <div className="flex flex-wrap items-center gap-2">

                              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[9px] uppercase tracking-wider text-zinc-500">
                                Encrypted Input
                              </span>

                              <span className="text-zinc-700">
                                →
                              </span>

                              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[9px] uppercase tracking-wider text-zinc-500">
                                Polynomial Student Model
                              </span>

                              <span className="text-zinc-700">
                                →
                              </span>

                              <span className="rounded-full border border-emerald-400/10 bg-emerald-400/[0.04] px-2.5 py-1 text-[9px] uppercase tracking-wider text-emerald-400">
                                Encrypted Output
                              </span>

                            </div>

                          </div>

                        )}

                      {/* Encrypted output */}

                      {step.id === 7 &&
                        (completed || active) && (

                          <div className="mt-4 rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-3">

                            <div className="flex items-center justify-between">

                              <span className="text-[10px] uppercase tracking-wider text-zinc-600">
                                Model output
                              </span>

                              <span className="text-xs font-medium text-amber-400">
                                ENCRYPTED
                              </span>

                            </div>

                            <p className="mt-2 text-[11px] leading-5 text-zinc-600">
                              Final prediction remains protected
                              until authorized decryption.
                            </p>

                          </div>

                        )}

                      {/* Authorization */}

                      {step.id === 8 &&
                        (completed || active) && (

                          <div className="mt-4 rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-3">

                            <div className="flex items-center gap-3">

                              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-amber-400/10 bg-amber-400/[0.04] text-xs text-amber-400">
                                ◈
                              </span>

                              <div>

                                <p className="text-xs font-medium text-zinc-400">
                                  Awaiting administrator authorization
                                </p>

                                <p className="mt-1 text-[10px] text-zinc-600">
                                  The result will remain protected
                                  until the decryption step is authorized.
                                </p>

                              </div>

                            </div>

                          </div>

                        )}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* Security information */}

      <section
        className="
          max-w-4xl
          rounded-2xl
          border
          border-white/10
          bg-white/[0.02]
          p-5
        "
      >

        <div className="flex gap-4">

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              text-xs
              text-zinc-400
            "
          >
            ◈
          </div>

          <div>

            <p className="text-sm font-medium text-zinc-300">
              Privacy-preserving computation
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-600">
              SHENOVA is designed so that sensitive healthcare
              information remains protected throughout the secure
              inference workflow. In this MVP, the execution
              sequence is simulated in the frontend; the actual
              CKKS encryption and encrypted model inference will
              be connected to the HE backend.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

/* -----------------------------
   Validation item
----------------------------- */

function ValidationItem({
  label,
  status,
}: {
  label: string;
  status: string;
}) {
  const completed =
    status !== "Checking";

  return (
    <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2.5">

      <span className="text-[10px] text-zinc-600">
        {label}
      </span>

      <span
        className={`
          text-[9px]
          font-medium
          uppercase
          tracking-wider
          ${
            completed
              ? "text-emerald-400"
              : "text-zinc-500"
          }
        `}
      >
        {completed ? "✓ " : ""}
        {status}
      </span>

    </div>
  );
}