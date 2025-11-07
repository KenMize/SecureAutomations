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
            <span className="font-semibold tracking-tight">
              Secure Automations
            </span>
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
              DoD-grade <span className="text-cyan-300">AI automation</span> for{" "}
              <span className="text-cyan-300">growing businesses</span>
            </h1>
            <p className="mt-5 text-slate-300 text-lg max-w-xl">
              We bring Department of Defense-level security and expertise to
              your AI workflows. Our team designs, deploys, and operates secure
              automations using Microsoft Copilot, n8n, and Azure OpenAI with
              Zero Trust controls, SSO/SCIM, and audit-ready reporting. You get
              the confidence of enterprise-grade compliance, simplified for your
              business.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/checkup"
                className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm shadow inline-flex items-center gap-2 hover:bg-slate-100 transition-colors font-medium"
              >
                Get a free AI security checkup
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
              <div className="text-sm text-slate-400 mb-3">
                Reference architecture
              </div>
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
                Every workflow passes through a secure layer that redacts
                sensitive data, prevents prompt-injection, and logs every action
                for audit and compliance.
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
            We help businesses automate safely, from customer support and
            finance to operations and compliance.
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
              href="/examples"
              className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm hover:bg-slate-100 transition-colors font-medium"
            >
              Explore automations
            </a>
          </div>
        </div>
      </section>

      {/* BUILT FOR REGULATED ENVIRONMENTS */}
      <section id="trust" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Enterprise security, simplified for SMBs
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Our frameworks and controls come from the same standards used across
            the U.S. Department of Defense and Fortune 500 environments, adapted
            for small and midsize teams.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "NIST 800-53",
                description:
                  "Proven DoD-level controls made practical for business use.",
              },
              {
                label: "SOC 2 (TSC)",
                description:
                  "Compliance-aligned automations and easy evidence reporting.",
              },
              {
                label: "ISO/IEC 27001",
                description:
                  "Data-protection and risk-management best practices, built in.",
              },
              {
                label: "ISO/IEC 42001",
                description:
                  "AI-governance standards adapted for your everyday workflows.",
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
                <div className="mt-3 text-sm text-slate-300">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SMBs CHOOSE US */}
      <section id="why-us" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Why growing teams work with us
          </h2>
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
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
              >
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

      {/* ROI FOR SMBS */}
      <section className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Built for SMB budgets, with enterprise-grade results
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Your team is stretched thin. Compliance is complex. Hiring
            specialists is expensive. At $1,500/month, our solution pays for
            itself while you focus on growth.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Pain Point 1: Time */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                The Time Problem
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                Manual processes eat 50-70 hours/month
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Your team spends hours on data entry, report generation,
                customer support tickets, and compliance documentation. That's
                time not spent on strategy or revenue.
              </p>
              <div className="mt-4 rounded-lg bg-slate-950/40 p-4 border border-cyan-300/20">
                <p className="text-xs text-slate-400">
                  Real cost to your business:
                </p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">
                  $3,000-5,000/month
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  (at $50-75/hour average staff cost)
                </p>
              </div>
            </div>

            {/* Pain Point 2: Compliance */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                The Compliance Problem
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                Audit prep and compliance consulting is expensive
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                External auditors, compliance consultants, and ad-hoc reviews
                cost thousands. Plus the risk of failed audits or regulatory
                fines if controls slip.
              </p>
              <div className="mt-4 rounded-lg bg-slate-950/40 p-4 border border-cyan-300/20">
                <p className="text-xs text-slate-400">
                  Typical consulting project cost:
                </p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">
                  $5,000-15,000
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  (plus ongoing audit labor)
                </p>
              </div>
            </div>

            {/* Pain Point 3: Hiring */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                The Hiring Problem
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                Can't afford to hire specialists
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                A full-time compliance or automation engineer costs
                $60-100k/year, plus benefits. Even a part-time contractor burns
                $5-8k/month. That's on top of existing payroll.
              </p>
              <div className="mt-4 rounded-lg bg-slate-950/40 p-4 border border-cyan-300/20">
                <p className="text-xs text-slate-400">
                  Annual cost of one FTE specialist:
                </p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">
                  $70,000-120,000
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  (base + benefits + onboarding)
                </p>
              </div>
            </div>

            {/* The Solution */}
            <div className="rounded-2xl border border-cyan-300/30 bg-slate-900/80 p-6">
              <div className="text-sm text-cyan-300 font-medium uppercase tracking-wider">
                The Secure Automations Solution
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                Starting at $1,500/month
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Automate your workflows. Meet compliance. Eliminate manual work.
                All managed by our team of DoD-grade security experts.
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex gap-2 text-sm">
                  <span className="text-cyan-300 font-semibold">
                    Year 1 savings:
                  </span>
                  <span className="text-slate-300">
                    $18,000-60,000 in labor + compliance costs
                  </span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="text-cyan-300 font-semibold">
                    Your investment:
                  </span>
                  <span className="text-slate-300">$18,000/year starting</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-400 italic">
                Plus: compliance audits become routine, your team gets hours
                back, and you sleep knowing your AI workflows are secure.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/60 p-8">
            <h3 className="text-lg font-semibold">Why this works for SMBs</h3>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-cyan-300">
                  50-70 hrs
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  Recovered per month for your team
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-300">$5k-15k</div>
                <p className="mt-2 text-sm text-slate-300">
                  Replaced external consulting costs
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-300">1+ FTE</div>
                <p className="mt-2 text-sm text-slate-300">
                  Worth of coverage without hiring
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm shadow inline-flex items-center gap-2 hover:bg-slate-100 transition-colors font-medium"
            >
              Get pricing for your business
            </a>
            <a
              href="/checkup"
              className="rounded-2xl border border-white/20 px-5 py-3 text-sm inline-flex items-center gap-2 hover:border-white/40 hover:bg-white/5 transition-colors font-medium"
            >
              Take the AI security assessment
            </a>
          </div>
        </div>
      </section>

      {/* TRUST & TESTIMONIALS */}
      <section className="border-t border-white/10 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Trusted by security-minded teams
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Our clients range from fast-moving startups to established service
            providers who need AI automation without risk.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-800/60 p-8">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-cyan-300 text-cyan-300" />
              ))}
            </div>
            <blockquote className="text-lg text-slate-100 italic mb-4">
              "Their background in defense-grade systems gave us total
              confidence. We now use AI in our CRM without any compliance
              headaches."
            </blockquote>
            <p className="text-sm text-slate-400">
              Operations Manager, Fintech Startup
            </p>
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

      {/* PARTNERS & INTEGRATIONS */}
      <section className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-sm text-slate-400 uppercase tracking-wider font-medium">
              Trusted Technology Partners
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Built on the best platforms
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
            {/* Microsoft */}
            <div className="flex items-center justify-center p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:border-white/20 transition-colors">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300 mb-2">
                  Microsoft
                </div>
                <p className="text-xs text-slate-400">Azure & Copilot</p>
              </div>
            </div>

            {/* OpenAI */}
            <div className="flex items-center justify-center p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:border-white/20 transition-colors">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300 mb-2">
                  OpenAI
                </div>
                <p className="text-xs text-slate-400">AI Models</p>
              </div>
            </div>

            {/* n8n */}
            <div className="flex items-center justify-center p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:border-white/20 transition-colors">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300 mb-2">n8n</div>
                <p className="text-xs text-slate-400">Automation</p>
              </div>
            </div>

            {/* Power Automate */}
            <div className="flex items-center justify-center p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:border-white/20 transition-colors">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300 mb-2">
                  Power Automate
                </div>
                <p className="text-xs text-slate-400">Workflows</p>
              </div>
            </div>

            {/* Slack */}
            <div className="flex items-center justify-center p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:border-white/20 transition-colors">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300 mb-2">
                  Slack
                </div>
                <p className="text-xs text-slate-400">Communication</p>
              </div>
            </div>

            {/* HubSpot */}
            <div className="flex items-center justify-center p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:border-white/20 transition-colors">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300 mb-2">
                  HubSpot
                </div>
                <p className="text-xs text-slate-400">CRM</p>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-slate-400 max-w-2xl mx-auto">
            Plus integrations with ServiceNow, Salesforce, Okta, Entra ID, and
            your custom APIs. Our platform works where you work.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Let's build your next secure automation
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Book a 30-minute consultation with our team. We'll review your
            goals, identify automation opportunities, and show you how to bring
            DoD-grade security to your business workflows.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm shadow inline-flex items-center gap-2 hover:bg-slate-100 transition-colors font-medium"
            >
              Book a 30-minute consultation
            </a>
            <a
              href="/examples"
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
            By submitting, you agree to our privacy notice. We never use your
            data to train models.
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
