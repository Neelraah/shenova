"use client";

import { useEffect, useState } from "react";

interface AnalysisProgressProps {
  onComplete?: () => void;
}

const steps = [
  {
    id: 1,
    title: "Dataset Validation",
    description: "Checking dataset structure and required features",
  },
  {
    id: 2,
    title: "Preprocessing",
    description: "Preparing healthcare data for secure inference",
  },
  {
    id: 3,
    title: "CKKS Encryption",
    description: "Encrypting sensitive patient data",
  },
  {
    id: 4,
    title: "Encrypted AI Inference",
    description: "Running the approved model on protected data",
  },
  {
    id: 5,
    title: "Generating Results",
    description: "Preparing the analysis results",
  },
];

export default function AnalysisProgress({
  onComplete,
}: AnalysisProgressProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [finished, setFinished] = useState(false);

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
    }, 1400);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (finished) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [finished, onComplete]);

  const progress = Math.min(
    (currentStep / steps.length) * 100,
    100
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-600">
          Secure Analysis
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-white">
          Analysis in Progress
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
          SHENOVA is processing the selected healthcare dataset through
          its privacy-preserving analysis pipeline.
        </p>
      </div>

      {/* Main progress card */}
      <section className="max-w-4xl rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
        {/* Status */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Current operation
            </p>

            <h2 className="mt-2 text-lg font-medium text-white">
              {finished
                ? "Analysis Complete"
                : steps[Math.min(currentStep - 1, steps.length - 1)].title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                finished ? "bg-emerald-400" : "animate-pulse bg-white"
              }`}
            />

            <span className="text-xs text-zinc-500">
              {finished ? "Completed" : "Processing"}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-7">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-zinc-600">
              Pipeline progress
            </span>

            <span className="text-xs text-zinc-400">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-white transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Pipeline */}
        <div className="mt-10">
          <div className="space-y-0">
            {steps.map((step, index) => {
              const completed = currentStep > step.id;
              const active = currentStep === step.id && !finished;

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
                              ? "border-white/20 bg-white/[0.08] text-white"
                              : active
                                ? "border-white/25 bg-white/[0.08] text-white"
                                : "border-white/10 bg-white/[0.02] text-zinc-700"
                          }
                        `}
                      >
                        {completed ? (
                          <span className="text-sm">✓</span>
                        ) : active ? (
                          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                        ) : (
                          `0${step.id}`
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
                                ? "bg-white/20"
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
                          className={`text-sm font-medium ${
                            completed || active
                              ? "text-white"
                              : "text-zinc-600"
                          }`}
                        >
                          {step.title}
                        </h3>

                        {completed && (
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] uppercase tracking-wider text-zinc-500">
                            Complete
                          </span>
                        )}

                        {active && (
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] uppercase tracking-wider text-zinc-400">
                            Processing
                          </span>
                        )}
                      </div>

                      <p
                        className={`mt-1 text-xs leading-5 ${
                          completed || active
                            ? "text-zinc-500"
                            : "text-zinc-700"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security information */}
      <section className="max-w-4xl rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xs text-zinc-400">
            ◈
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-300">
              Privacy-preserving computation
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-600">
              SHENOVA is designed to protect sensitive healthcare
              information throughout the secure analysis workflow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}