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
  Zap,
  Star,
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
            <a href="#why-us" className="hover:text-white transition-colors">
              Why Us
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white text-slate-950 text-sm shadow hover:bg-slate-100 transition-colors font-medium"
          >
            Book a consultation
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
              DoD-grade <span className="text-cyan-300">AI automation</span> — built for{" "}
              <span className="text-cyan-300">growing businesses</span>
            </h1>
            <p className="mt-5 text-slate-300 text-lg max-w-xl">
              We bring Department of Defense–level security and expertise to your AI workflows.
              Our team designs, deploys, and operates secure automations using Microsoft Copilot,
              n8n, and Azure OpenAI — all with Zero Trust controls, SSO/SCIM, and audit-ready
              reporting. You get the confidence of enterprise-grade compliance, simplified for your
              business.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm shadow inline-flex items-center gap-2 hover:bg-slate-100 transition-colors font-medium"
              >
                🔒 Get a free AI security checkup
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
                DoD-hardened
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" />
                Audit-ready
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
              <p className="mt-4 text-sm text-slate-300 mb-3">
                Every workflow passes through a secure layer — redacting sensitive data, preventing
                prompt-injection, and logging every action for audit and compliance.
              </p>
              <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                <li>DoD-inspired data-protection architecture</li>
                <li>Role-based access synced with your SSO provider</li>
                <li>Immutable audit logs sent to your SIEM or dashboard</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="solutions" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Secure AI workflows that save time and protect trust
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            We help businesses automate safely — from customer support and finance to operations
            and compliance.
          </p>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {[
              "Connect your tools like HubSpot, Slack, and Microsoft 365",
              "Automate repetitive tasks with privacy-first AI",
              "Keep full control of your data, logs, and access",
              "Get guidance from experts with real DoD automation experience",
            ].map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 flex items-start gap-3"
              >
                <CheckCircle2 className="h-5 w-5 mt-1 flex-shrink-0 text-cyan-300" />
                <p className="text-slate-300">{point}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm hover:bg-slate-100 transition-colors font-medium"
            >
              🚀 Explore automations
            </a>
          </div>
        </div>
      </section>

      {/* BUILT FOR REGULATED ENVIRONMENTS */}
      <section id="trust" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Enterprise security, simplified for SMBs</h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Our frameworks and controls come from the same standards used across the U.S. Department
            of Defense and Fortune 500 environments — adapted for small and midsize teams.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "NIST 800-53",
                description: "Proven DoD-level controls made practical for business use.",
              },
              {
                label: "SOC 2 (TSC)",
                description: "Compliance-aligned automations and easy evidence reporting.",
              },
              {
                label: "ISO/IEC 27001",
                description: "Data-protection and risk-management best practices, built in.",
              },
              {
                label: "ISO/IEC 42001",
                description: "AI-governance standards adapted for your everyday workflows.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm text-slate-400">Framework</div>
                  <div className="text-lg font-medium mt-2">{item.label}</div>
                </div>
                <div className="mt-3 text-sm text-slate-300">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SMBs CHOOSE US */}
      <section id="why-us" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Why growing teams work with us</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Shield,
                title: "Defense-grade expertise",
                copy: "Built by consultants who've secured AI at the Department of Defense",
              },
              {
                icon: Zap,
                title: "Compliance without complexity",
                copy: "Templates and guardrails for HIPAA, SOC 2, and GDPR",
              },
              {
                icon: BadgeCheck,
                title: "Affordable security",
                copy: "Enterprise standards at SMB-friendly pricing",
              },
              {
                icon: Rocket,
                title: "No IT team needed",
                copy: "We design, deploy, and manage your automations",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <h3 className="font-medium">{title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & TESTIMONIALS */}
      <section className="border-t border-white/10 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Trusted by security-minded teams</h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Our clients range from fast-moving startups to established service providers who need AI
            automation without risk.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-800/60 p-8">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-cyan-300 text-cyan-300" />
              ))}
            </div>
            <blockquote className="text-lg text-slate-100 italic mb-4">
              "Their background in defense-grade systems gave us total confidence. We now use AI in
              our CRM without any compliance headaches."
            </blockquote>
            <p className="text-sm text-slate-400">— Operations Manager, Fintech Startup</p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "✅ Microsoft Partner",
              "Azure OpenAI Integrator",
              "NIST-Mapped",
              "DoD-Experienced",
            ].map((badge) => (
              <div
                key={badge}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center text-sm font-medium"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Let's build your next secure automation
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Book a 30-minute consultation with our team. We'll review your goals, identify
            automation opportunities, and show you how to bring DoD-grade security to your business
            workflows.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#booking"
              className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm shadow inline-flex items-center gap-2 hover:bg-slate-100 transition-colors font-medium"
            >
              Book a 30-minute consultation
            </a>
            <a
              href="#examples"
              className="rounded-2xl border border-white/20 px-5 py-3 text-sm inline-flex items-center gap-2 hover:border-white/40 hover:bg-white/5 transition-colors font-medium"
            >
              See example workflows
            </a>
          </div>

          <form className="mt-12 grid md:grid-cols-2 gap-4 max-w-2xl">
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
              placeholder="Tell us about your automation needs and any compliance requirements..."
            />
            <button className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm w-fit font-medium hover:bg-slate-100 transition-colors">
              Request consultation
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
