import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Workflow,
  CheckCircle2,
  Rocket,
  BadgeCheck,
  ArrowRight,
  Building2,
  Users,
  CircuitBoard,
  ServerCog,
  FileCheck2,
  Gauge,
} from "lucide-react";

export default function LandingSecureAI() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-white text-slate-950 font-black flex items-center justify-center">
              SA
            </div>
            <span className="font-semibold tracking-tight">Secure Automations</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#solutions" className="hover:text-white transition-colors">
              Solutions
            </a>
            <a href="#trust" className="hover:text-white transition-colors">
              Trust
            </a>
            <a href="#industries" className="hover:text-white transition-colors">
              Industries
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white text-slate-950 text-sm shadow hover:bg-slate-100 transition-colors font-medium"
          >
            Book a discovery
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Security-first AI Automation
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              DoD‑grade <span className="text-cyan-300">AI workflows</span> that your{" "}
              <span className="text-cyan-300">auditors</span> approve
            </h1>
            <p className="mt-5 text-slate-300 text-lg max-w-xl">
              We design, deploy, and operate n8n, Microsoft Copilot, and Azure OpenAI automations
              with Zero Trust controls, SSO/SCIM, and evidence‑ready reporting aligned to NIST
              800‑53, SOC&nbsp;2, ISO&nbsp;27001, and ISO&nbsp;42001.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm shadow inline-flex items-center gap-2 hover:bg-slate-100 transition-colors font-medium"
              >
                Book a 30‑min consult <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#solutions"
                className="rounded-2xl border border-white/20 px-5 py-3 text-sm inline-flex items-center gap-2 hover:border-white/40 hover:bg-white/5 transition-colors font-medium"
              >
                See solutions
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Zero Trust
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                SSO/SCIM
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" />
                Audit‑ready
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl p-6">
              <div className="text-sm text-slate-400 mb-3">Reference architecture</div>
              <div className="rounded-2xl bg-slate-950/60 p-5">
                <div className="grid grid-cols-6 gap-3 text-xs">
                  <div className="col-span-2 rounded-xl bg-slate-900/70 shadow p-3 border border-white/10 flex items-center gap-2">
                    <Workflow className="h-4 w-4" /> Intake
                  </div>
                  <div className="col-span-2 rounded-xl bg-slate-900/70 shadow p-3 border border-white/10 flex items-center gap-2">
                    <Workflow className="h-4 w-4" /> LLM Guard
                  </div>
                  <div className="col-span-2 rounded-xl bg-slate-900/70 shadow p-3 border border-white/10 flex items-center gap-2">
                    <Workflow className="h-4 w-4" /> Redact/Mask
                  </div>
                  <div className="col-span-3 rounded-xl bg-slate-900/70 shadow p-3 border border-white/10 flex items-center gap-2">
                    <Workflow className="h-4 w-4" /> n8n / Power Automate
                  </div>
                  <div className="col-span-3 rounded-xl bg-slate-900/70 shadow p-3 border border-white/10 flex items-center gap-2">
                    <Workflow className="h-4 w-4" /> SIEM + Evidence
                  </div>
                </div>
              </div>
              <ul className="mt-4 text-sm text-slate-300 space-y-1 list-disc list-inside">
                <li>Prompt‑injection &amp; data‑exfiltration guardrails</li>
                <li>Row‑level access with SCIM‑synced roles</li>
                <li>Immutable audit logs shipped to your SIEM</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Built for regulated environments</h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Designed for healthcare, fintech, and public sector where privacy, integrity, and
            auditability are non‑negotiable.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["NIST 800‑53", "SOC 2 (TSC)", "ISO/IEC 27001", "ISO/IEC 42001"].map((label) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 h-full flex flex-col justify-between"
              >
                <div className="text-sm text-slate-400">Framework</div>
                <div className="text-lg font-medium">{label}</div>
                <div className="mt-3 text-sm text-slate-300">
                  Mapped controls, evidence plans, and auditor‑ready reports.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Who we serve</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Building2,
                title: "Healthcare &amp; Healthtech",
                copy: "HIPAA/HITRUST‑aligned assistants and back‑office automations with PHI minimization.",
              },
              {
                icon: ServerCog,
                title: "FinTech &amp; SaaS",
                copy: "PCI‑aware workflows, evidence capture, and change control baked in.",
              },
              {
                icon: Users,
                title: "Public Sector",
                copy: "Azure Government patterns, private networking, and strict RBAC.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <h3 className="font-medium">{title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Solutions</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Secure AI Readiness",
                points: [
                  "Threat &amp; data‑flow modeling",
                  "Zero Trust &amp; SSO/SCIM plan",
                  "Control mapping (NIST/SOC2/ISO)",
                ],
              },
              {
                title: "Secure Automations",
                points: [
                  "n8n • Power Automate • Copilot Studio",
                  "Guardrails, redaction, secrets hardening",
                  "SIEM logging &amp; evidence kits",
                ],
              },
              {
                title: "Managed AI Ops",
                points: ["Monitoring &amp; patches", "KPI &amp; cost dashboards", "Quarterly control attestation"],
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <div className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  <h3 className="font-medium">{card.title}</h3>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {card.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="border-t border-white/10 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-4 gap-6 text-sm">
          <div className="rounded-2xl border border-white/10 p-5 flex items-start gap-3">
            <Gauge className="h-5 w-5 flex-shrink-0" />{" "}
            <div>
              <div className="font-medium">Fast pilots</div>
              <div className="text-slate-300">Production‑ready in 4–6 weeks</div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 p-5 flex items-start gap-3">
            <FileCheck2 className="h-5 w-5 flex-shrink-0" />{" "}
            <div>
              <div className="font-medium">Audit evidence</div>
              <div className="text-slate-300">Control mapping &amp; logs included</div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 p-5 flex items-start gap-3">
            <Shield className="h-5 w-5 flex-shrink-0" />{" "}
            <div>
              <div className="font-medium">Zero Trust patterns</div>
              <div className="text-slate-300">Private networking &amp; RBAC</div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 p-5 flex items-start gap-3">
            <CircuitBoard className="h-5 w-5 flex-shrink-0" />{" "}
            <div>
              <div className="font-medium">Platform‑agnostic</div>
              <div className="text-slate-300">n8n • Power Platform • Azure</div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Pilot pricing</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Assess",
                price: "$7,500",
                features: ["2‑week risk &amp; roadmap", "Control mapping", "Pilot backlog"],
              },
              {
                name: "Build",
                price: "$25,000",
                features: ["4–6 week build", "Guardrails &amp; SSO/SCIM", "Audit‑ready docs"],
              },
              {
                name: "Operate",
                price: "$4,000/mo",
                features: ["Monitoring &amp; patches", "Evidence &amp; KPIs", "Quarterly attestations"],
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <div className="text-sm text-slate-400">Pilot</div>
                <div className="text-xl font-semibold">{t.name}</div>
                <div className="mt-2 text-3xl font-bold">{t.price}</div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-5 inline-block rounded-2xl bg-white text-slate-950 px-4 py-2 text-sm font-medium hover:bg-slate-100 transition-colors"
                >
                  Start pilot
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Book a discovery call</h2>
          <p className="mt-2 text-slate-300">
            Tell us about your use case and compliance needs. We'll reply within one business day.
          </p>
          <form className="mt-8 grid md:grid-cols-2 gap-4">
            <input
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              placeholder="Name"
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              placeholder="Work email"
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 md:col-span-2 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              placeholder="Company / Industry"
            />
            <textarea
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 md:col-span-2 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              rows={5}
              placeholder="What would you like to automate? Any frameworks to satisfy (e.g., NIST, SOC 2, ISO 27001)?"
            />
            <button className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm w-fit font-medium hover:bg-slate-100 transition-colors">
              Request consult
            </button>
          </form>
          <p className="mt-6 text-xs text-slate-500">
            By submitting, you agree to our privacy notice. We never use your data to train models.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-400 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Secure Automations</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Responsible AI
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
