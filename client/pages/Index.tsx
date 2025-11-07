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
            <img src="/logo.svg" alt="Secure Automations" className="h-8 w-8" />
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
              Deploy AI agents that work 24/7
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Build and deploy AI agents that{" "}
              <span className="text-cyan-300">drive revenue</span> and{" "}
              <span className="text-cyan-300">cut costs</span>
            </h1>
            <p className="mt-5 text-slate-300 text-lg max-w-xl">
              Create intelligent agents that handle customer conversations, book appointments, qualify leads, and manage your workflows. Your team stays focused on what matters.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/checkup"
                className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm shadow inline-flex items-center gap-2 hover:bg-slate-100 transition-colors font-medium"
              >
                See what your agents could do
              </a>
              <a
                href="#solutions"
                className="rounded-2xl border border-white/20 px-5 py-3 text-sm inline-flex items-center gap-2 hover:border-white/40 hover:bg-white/5 transition-colors font-medium"
              >
                Explore agent templates
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Deploy in minutes
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Enterprise security
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" />
                Zero coding required
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl p-6">
              <div className="text-sm text-slate-400 mb-3">Ready-to-use agent templates</div>
              <div className="rounded-2xl bg-slate-950/60 p-5">
                <div className="grid grid-cols-6 gap-3 text-xs">
                  <div className="col-span-2 rounded-xl bg-slate-900/70 shadow p-3 border border-white/10 flex items-center gap-2">
                    <Users className="h-4 w-4" /> Customer support bot
                  </div>
                  <div className="col-span-2 rounded-xl bg-slate-900/70 shadow p-3 border border-white/10 flex items-center gap-2">
                    <Workflow className="h-4 w-4" /> Appointment scheduler
                  </div>
                  <div className="col-span-2 rounded-xl bg-slate-900/70 shadow p-3 border border-white/10 flex items-center gap-2">
                    <Rocket className="h-4 w-4" /> Lead qualifier
                  </div>
                  <div className="col-span-3 rounded-xl bg-slate-900/70 shadow p-3 border border-white/10 flex items-center gap-2">
                    <Zap className="h-4 w-4" /> Email automation
                  </div>
                  <div className="col-span-3 rounded-xl bg-slate-900/70 shadow p-3 border border-white/10 flex items-center gap-2">
                    <Gauge className="h-4 w-4" /> Performance tracking
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-300 mb-3">
                Deploy intelligent agents that work 24/7 on your website, email, and messaging platforms. No coding or AI expertise required.
              </p>
              <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                <li>
                  Agents learn your business in minutes, not weeks
                </li>
                <li>
                  Monitor every interaction and adjust behavior in real-time
                </li>
                <li>
                  See ROI immediately with built-in analytics and reporting
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI AGENTS FOR REVENUE */}
      <section id="solutions" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            AI agents that generate revenue
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Deploy intelligent agents on your website, email, and messaging platforms to convert more leads, book more appointments, and delight your customers while you sleep.
          </p>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {[
              "Customer service chatbot that solves 70% of support tickets automatically",
              "Appointment scheduler that books meetings and sends reminders 24/7",
              "Lead qualifier that screens prospects and routes hot leads to your team",
              "Email responder that handles FAQs and schedules follow-ups",
            ].map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 flex items-start gap-3"
              >
                <Rocket className="h-5 w-5 mt-1 flex-shrink-0 text-cyan-300" />
                <p className="text-slate-300">{point}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a
              href="/examples"
              className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm hover:bg-slate-100 transition-colors font-medium"
            >
              See agent examples
            </a>
          </div>
        </div>
      </section>

      {/* BUILT FOR REGULATED ENVIRONMENTS */}
      <section id="trust" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Enterprise AI with SMB simplicity
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Deploy with confidence knowing your customer data is protected to the same standards as Fortune 500 companies and U.S. government agencies.
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
            Why SMBs choose us
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Rocket,
                title: "Immediate revenue impact",
                copy: "Book 100+ more appointments per month, close 30% more deals, cut support costs by half",
              },
              {
                icon: Zap,
                title: "Instant deployment",
                copy: "Launch agents in 24 hours. No engineering team, no long implementation.",
              },
              {
                icon: BadgeCheck,
                title: "Affordable at scale",
                copy: "Starting at $1,500/month. Pay based on usage, not complexity.",
              },
              {
                icon: Shield,
                title: "Secure by design",
                copy: "Enterprise-grade security and compliance built in, not bolted on",
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
            ROI that pays for itself in days
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Starting at $1,500/month. Most SMBs see payback in weeks through improved conversions, reduced support costs, and higher customer lifetime value.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Revenue Impact */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                Revenue Impact
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                Appointment schedulers convert 20% more leads
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                24/7 appointment booking means your sales team has a full pipeline. No more missed opportunities when you're not answering the phone.
              </p>
              <div className="mt-4 rounded-lg bg-slate-950/40 p-4 border border-cyan-300/20">
                <p className="text-xs text-slate-400">
                  New annual revenue generated:
                </p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">
                  $25,000-50,000+
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  (conservative estimate for service businesses)
                </p>
              </div>
            </div>

            {/* Cost Reduction */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                Cost Reduction
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                Support chatbot eliminates 60% of common inquiries
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Stop paying your team to answer the same questions. AI handles FAQs, order status, and common issues instantly.
              </p>
              <div className="mt-4 rounded-lg bg-slate-950/40 p-4 border border-cyan-300/20">
                <p className="text-xs text-slate-400">
                  Annual support labor saved:
                </p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">
                  $15,000-30,000
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  (vs. hiring or outsourcing)
                </p>
              </div>
            </div>

            {/* Efficiency Gain */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                Team Efficiency
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                Automate 40+ hours of manual work per month
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Lead qualification, follow-up emails, appointment reminders, invoice tracking. All handled automatically while your team focuses on closing deals and growing relationships.
              </p>
              <div className="mt-4 rounded-lg bg-slate-950/40 p-4 border border-cyan-300/20">
                <p className="text-xs text-slate-400">
                  Time freed per employee:
                </p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">
                  1 day per week
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  (valued at $400-600/week)
                </p>
              </div>
            </div>

            {/* The Solution */}
            <div className="rounded-2xl border border-cyan-300/30 bg-slate-900/80 p-6">
              <div className="text-sm text-cyan-300 font-medium uppercase tracking-wider">
                Total first-year ROI
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                $40,000-80,000 in new value
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Against $18,000/year cost. That's 2-4x return on investment before considering customer satisfaction and retention improvements.
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex gap-2 text-sm">
                  <span className="text-cyan-300 font-semibold">
                    Year 1 comparison:
                  </span>
                  <span className="text-slate-300">
                    Save $24,000-110,000 in labor + hiring
                  </span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="text-cyan-300 font-semibold">
                    Your cost:
                  </span>
                  <span className="text-slate-300">$18,000/year</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-400 italic">
                You get back 50+ hours a month. Your team stays focused on
                growth. Audits become straightforward.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/60 p-8">
            <h3 className="text-lg font-semibold">The real payoff</h3>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-cyan-300">
                  50+ hrs/month
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  Your team gets back to focus on real work
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-300">$60k+</div>
                <p className="mt-2 text-sm text-slate-300">
                  You don't spend on hiring specialists
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-300">
                  Audit-ready
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  Compliance is handled, not a constant worry
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
            Real teams, real results
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            From dental practices to e-commerce shops, small teams automate
            their busywork and focus on growth.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-cyan-300 text-cyan-300"
                  />
                ))}
              </div>
              <blockquote className="text-base text-slate-100 italic mb-4">
                "Our office now runs 24/7 automations. Leads come in, they hit
                our CRM, invoices generate themselves. We sleep better."
              </blockquote>
              <p className="text-sm text-slate-400">
                Founder, Dental Practice (Austin, TX)
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-cyan-300 text-cyan-300"
                  />
                ))}
              </div>
              <blockquote className="text-base text-slate-100 italic mb-4">
                "We got audited last month. Secure Automations' audit logs made
                compliance trivial. The auditor had nothing to question."
              </blockquote>
              <p className="text-sm text-slate-400">
                Operations Lead, E-Commerce Startup
              </p>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Works with Microsoft, OpenAI",
              "Audit-ready out of the box",
              "Encrypted & compliant by default",
              "No IT knowledge required",
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
