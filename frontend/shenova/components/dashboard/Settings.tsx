"use client";

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          Configuration
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
          Manage your SHENOVA workspace, security preferences, and analysis
          environment.
        </p>
      </div>

      {/* Account */}
      <section
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-6
        "
      >
        <SectionHeader
          eyebrow="Account"
          title="Administrator Profile"
          description="Information associated with the current hospital administrator account."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <SettingField
            label="Name"
            value="Administrator"
          />

          <SettingField
            label="Role"
            value="Hospital Administrator"
          />

          <SettingField
            label="Organization"
            value="Hospital Environment"
          />

          <SettingField
            label="Access Level"
            value="Analysis & Reporting"
          />
        </div>
      </section>

      {/* Security */}
      <section
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-6
        "
      >
        <SectionHeader
          eyebrow="Security"
          title="Security Preferences"
          description="Controls related to the privacy-preserving analysis environment."
        />

        <div className="mt-6 divide-y divide-white/[0.06]">
          <ToggleRow
            title="Secure Environment"
            description="Keep the SHENOVA application operating within the secure analysis environment."
            enabled
          />

          <ToggleRow
            title="Encrypted Inference"
            description="Require encrypted inference for supported healthcare analysis workflows."
            enabled
          />

          <ToggleRow
            title="Analysis Audit Logging"
            description="Maintain metadata about analysis activity for administrative review."
            enabled
          />
        </div>
      </section>

      {/* Analysis preferences */}
      <section
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-6
        "
      >
        <SectionHeader
          eyebrow="Analysis"
          title="Analysis Preferences"
          description="Default settings used when starting a new secure analysis."
        />

        <div className="mt-6 space-y-4">
          <PreferenceRow
            label="Default Model"
            value="SHENOVA Breast Cancer Risk Model"
          />

          <PreferenceRow
            label="Encryption Scheme"
            value="CKKS"
          />

          <PreferenceRow
            label="Inference Mode"
            value="Encrypted"
          />

          <PreferenceRow
            label="Result Visibility"
            value="Authorized Administrator"
          />
        </div>
      </section>

      {/* Notifications */}
      <section
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-6
        "
      >
        <SectionHeader
          eyebrow="Notifications"
          title="Notifications"
          description="Choose which application events should be surfaced to the administrator."
        />

        <div className="mt-6 divide-y divide-white/[0.06]">
          <ToggleRow
            title="Analysis Completed"
            description="Notify when secure inference has finished successfully."
            enabled
          />

          <ToggleRow
            title="Report Generated"
            description="Notify when a new analysis report is available."
            enabled
          />

          <ToggleRow
            title="Security Events"
            description="Surface important security or encryption-related events."
            enabled
          />
        </div>
      </section>

      {/* System information */}
      <section
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-6
        "
      >
        <SectionHeader
          eyebrow="System"
          title="System Information"
          description="Current SHENOVA environment and model configuration."
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SystemCard
            label="Platform"
            value="SHENOVA"
          />

          <SystemCard
            label="Application"
            value="v1.0"
          />

          <SystemCard
            label="HE Scheme"
            value="CKKS"
          />

          <SystemCard
            label="Model Status"
            value="Approved"
          />
        </div>
      </section>

      {/* Security notice */}
      <div
        className="
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-white/[0.07]
          bg-white/[0.02]
          p-5
        "
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs text-zinc-500">
          ◈
        </div>

        <div>
          <p className="text-xs font-medium text-zinc-300">
            Security configuration
          </p>

          <p className="mt-1 max-w-3xl text-[11px] leading-5 text-zinc-600">
            SHENOVA settings shown here represent the current application
            configuration. Production deployments can connect these controls
            to the hospital's authentication, authorization, audit, and
            infrastructure policies.
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-600">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-lg font-semibold text-white">
        {title}
      </h2>

      <p className="mt-1 max-w-2xl text-xs leading-5 text-zinc-600">
        {description}
      </p>
    </div>
  );
}

function SettingField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
      <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-600">
        {label}
      </p>

      <p className="mt-2 text-xs font-medium text-zinc-300">
        {value}
      </p>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
}: {
  title: string;
  description: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-5 first:pt-0 last:pb-0">
      <div>
        <p className="text-xs font-medium text-zinc-300">
          {title}
        </p>

        <p className="mt-1 max-w-2xl text-[10px] leading-5 text-zinc-600">
          {description}
        </p>
      </div>

      <div
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          border
          ${
            enabled
              ? "border-emerald-400/20 bg-emerald-400/[0.12]"
              : "border-white/10 bg-white/[0.04]"
          }
        `}
      >
        <span
          className={`
            absolute
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            rounded-full
            transition
            ${
              enabled
                ? "left-[22px] bg-emerald-400"
                : "left-1 bg-zinc-600"
            }
          `}
        />
      </div>
    </div>
  );
}

function PreferenceRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-2 rounded-xl border border-white/[0.07] bg-black/20 p-4 sm:flex-row sm:items-center">
      <span className="text-xs text-zinc-500">
        {label}
      </span>

      <span className="text-xs font-medium text-zinc-300">
        {value}
      </span>
    </div>
  );
}

function SystemCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-black/20 p-4">
      <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-600">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}