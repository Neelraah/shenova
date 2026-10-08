"use client";

type EncryptionProps = {
  onStartAnalysis: () => void;
};

export default function Encryption({
  onStartAnalysis,
}: EncryptionProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            Security
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Encryption
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Understand how SHENOVA protects healthcare data throughout the
            privacy-preserving inference workflow.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

          <span className="text-[10px] uppercase tracking-[0.15em] text-emerald-400">
            Secure Environment
          </span>
        </div>
      </div>

      {/* Security overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SecurityCard
          label="Encryption Scheme"
          value="CKKS"
          detail="Homomorphic encryption"
        />

        <SecurityCard
          label="Data During Inference"
          value="Encrypted"
          detail="Protected computation"
        />

        <SecurityCard
          label="Patient Data Exposure"
          value="None"
          detail="During model inference"
        />
      </div>

      {/* Main workflow */}
      <section
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-6
          md:p-8
        "
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            Privacy-Preserving Pipeline
          </p>

          <h2 className="mt-2 text-lg font-semibold text-white">
            How secure inference works
          </h2>

          <p className="mt-2 max-w-2xl text-xs leading-6 text-zinc-600">
            SHENOVA encrypts sensitive healthcare data before inference and
            performs computation while the underlying values remain protected.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <FlowStep
            number="01"
            title="Healthcare Dataset"
            description="The hospital administrator submits an approved healthcare dataset for analysis."
            status="Input"
          />

          <FlowConnector />

          <FlowStep
            number="02"
            title="Data Encryption"
            description="Sensitive feature values are transformed into ciphertext before secure computation."
            status="Encrypted"
            active
          />

          <FlowConnector />

          <FlowStep
            number="03"
            title="Encrypted Inference"
            description="The HE-compatible student model performs inference directly on encrypted data."
            status="Computing"
            active
          />

          <FlowConnector />

          <FlowStep
            number="04"
            title="Protected Result"
            description="The encrypted computation produces the model output without exposing the underlying patient records."
            status="Protected"
            active
          />

          <FlowConnector />

          <FlowStep
            number="05"
            title="Final Result"
            description="Only the authorized final analysis result is made available to the hospital administrator."
            status="Output"
          />
        </div>
      </section>

      {/* Architecture */}
      <section
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-6
          md:p-8
        "
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            Secure Architecture
          </p>

          <h2 className="mt-2 text-lg font-semibold text-white">
            Data protection boundary
          </h2>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-5 lg:items-center">
          <ArchitectureNode
            title="Hospital Data"
            description="Sensitive patient features"
          />

          <ArchitectureArrow />

          <ArchitectureNode
            title="CKKS Encryption"
            description="Convert data to ciphertext"
            highlighted
          />

          <ArchitectureArrow />

          <ArchitectureNode
            title="HE Model"
            description="Inference on encrypted data"
            highlighted
          />
        </div>

        <div className="mt-4 hidden lg:flex lg:items-center lg:justify-end lg:gap-4">
          <ArchitectureArrow />

          <ArchitectureNode
            title="Result"
            description="Authorized prediction"
          />
        </div>

        <div className="mt-6 rounded-xl border border-white/[0.07] bg-black/20 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs text-zinc-500">
              ◈
            </div>

            <div>
              <p className="text-xs font-medium text-zinc-300">
                Computation happens inside the privacy boundary
              </p>

              <p className="mt-1 text-[11px] leading-5 text-zinc-600">
                The central inference stage operates on encrypted values. The
                system does not require the underlying patient values to be
                exposed to the model execution layer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Encryption properties */}
      <section
        className="
          grid
          gap-4
          md:grid-cols-2
          lg:grid-cols-4
        "
      >
        <PropertyCard
          title="Encryption"
          value="CKKS"
          description="Approximate-number homomorphic encryption scheme used for secure numerical computation."
        />

        <PropertyCard
          title="Computation"
          value="Encrypted"
          description="Model inference is performed without first converting the protected inputs back to plaintext."
        />

        <PropertyCard
          title="Model"
          value="HE Compatible"
          description="The deployed student model is designed to operate within the encrypted computation constraints."
        />

        <PropertyCard
          title="Output"
          value="Controlled"
          description="Only the authorized final analysis output is exposed to the hospital application."
        />
      </section>

      {/* CTA */}
      <section
        className="
          flex
          flex-col
          justify-between
          gap-5
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-6
          md:flex-row
          md:items-center
          md:p-7
        "
      >
        <div>
          <p className="text-sm font-medium text-zinc-200">
            Ready to run a secure analysis?
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            Upload your dataset and use an approved HE-compatible model.
          </p>
        </div>

        <button
          onClick={onStartAnalysis}
          className="
            w-fit
            rounded-xl
            bg-white
            px-5
            py-3
            text-xs
            font-semibold
            text-black
            transition
            hover:bg-zinc-200
          "
        >
          Start Secure Analysis
        </button>
      </section>
    </div>
  );
}

function SecurityCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <p className="text-[9px] uppercase tracking-[0.17em] text-zinc-600">
        {label}
      </p>

      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-zinc-600">
        {detail}
      </p>
    </div>
  );
}

function FlowStep({
  number,
  title,
  description,
  status,
  active = false,
}: {
  number: string;
  title: string;
  description: string;
  status: string;
  active?: boolean;
}) {
  return (
    <div
      className={`
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        p-5
        transition
        md:flex-row
        md:items-center
        ${
          active
            ? "border-white/[0.12] bg-white/[0.035]"
            : "border-white/[0.07] bg-black/20"
        }
      `}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[10px] text-zinc-500">
        {number}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-zinc-200">
          {title}
        </p>

        <p className="mt-1 text-[11px] leading-5 text-zinc-600">
          {description}
        </p>
      </div>

      <span
        className={`
          w-fit
          rounded-full
          border
          px-3
          py-1.5
          text-[9px]
          uppercase
          tracking-wider
          ${
            active
              ? "border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-400"
              : "border-white/10 bg-white/[0.03] text-zinc-600"
          }
        `}
      >
        {status}
      </span>
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="flex justify-center py-1 text-zinc-700">
      ↓
    </div>
  );
}

function ArchitectureNode({
  title,
  description,
  highlighted = false,
}: {
  title: string;
  description: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`
        rounded-xl
        border
        p-4
        ${
          highlighted
            ? "border-white/[0.12] bg-white/[0.035]"
            : "border-white/[0.07] bg-black/20"
        }
      `}
    >
      <p className="text-xs font-medium text-zinc-300">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-zinc-600">
        {description}
      </p>
    </div>
  );
}

function ArchitectureArrow() {
  return (
    <div className="hidden text-center text-zinc-700 lg:block">
      →
    </div>
  );
}

function PropertyCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <p className="text-[9px] uppercase tracking-[0.16em] text-zinc-600">
        {title}
      </p>

      <p className="mt-2 text-sm font-semibold text-white">
        {value}
      </p>

      <p className="mt-2 text-[10px] leading-5 text-zinc-600">
        {description}
      </p>
    </div>
  );
}