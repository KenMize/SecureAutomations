import React, { useState } from "react";
import { motion } from "framer-motion";
import { apiUrl, getEnvVar } from "../lib/api";
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
  MessageSquare,
  Clock,
} from "lucide-react";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const initialContactForm: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

const CONTACT_FORM_ENDPOINT = apiUrl(
  getEnvVar("VITE_CONTACT_FORM_PATH") ?? "contact",
);

export default function LandingSecureAI() {
  const [contactForm, setContactForm] =
    useState<ContactFormState>(initialContactForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone ?? "",
        company: contactForm.company,
        message: contactForm.message,
        source: "SecureAutomations.ai",
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setContactForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
        alert("Thank you! We'll contact you within 2 hours.");
      } else {
        let errorMessage = "Unknown error";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status}`;
        }
        alert(`Failed to submit form: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        "An error occurred. Please check your internet connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <a href="/pricing" className="hover:text-white transition-colors">
              Pricing
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
              AI agents + workflow automations
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Customer-facing AI that works hand-in-hand with{" "}
              <span className="text-cyan-300">smart backend automation</span>
            </h1>
            <p className="mt-5 text-slate-300 text-lg max-w-xl">
              Deploy intelligent agents to engage customers, book appointments,
              and generate leads. Pair them with workflow automation to process
              data, update systems, and manage internal operations. Choose one
              or both.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/checkup"
                className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm shadow inline-flex items-center gap-2 hover:bg-slate-100 transition-colors font-medium"
              >
                Get a free AI security checkup
              </a>
              <a
                href="/quiz"
                className="rounded-2xl border border-white/20 px-5 py-3 text-sm inline-flex items-center gap-2 hover:border-white/40 hover:bg-white/5 transition-colors font-medium"
              >
                Take the automation quiz
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
              <div className="text-sm text-slate-400 mb-4">
                How they work together
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-950/60 p-4 border border-cyan-300/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-cyan-300" />
                    <span className="font-semibold text-sm">
                      AI Agents (Customer-Facing)
                    </span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 ml-6 list-disc">
                    <li>Support chatbots answer questions instantly</li>
                    <li>Appointment schedulers book meetings 24/7</li>
                    <li>Lead qualifiers screen prospects automatically</li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <div className="text-xs text-slate-400 bg-slate-950/40 px-3 py-1 rounded-full">
                    ↕ Hand-in-hand ↕
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-950/60 p-4 border border-cyan-300/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Workflow className="h-4 w-4 text-cyan-300" />
                    <span className="font-semibold text-sm">
                      Workflow Automations (Backend)
                    </span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1 ml-6 list-disc">
                    <li>Auto-process invoices and payments</li>
                    <li>Update CRM and systems in real-time</li>
                    <li>Generate compliance logs and audit trails</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-300">
                Agents engage your customers. Automations handle the backend
                work. Together, they create a seamless, 24/7 operation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SOLUTIONS: AGENTS + AUTOMATIONS */}
      <section id="solutions" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Two solutions. Choose one or both.
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Deploy AI agents to engage customers. Use workflow automations to
            streamline operations. Or combine both for a seamless, 24/7 business
            engine.
          </p>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* AI AGENTS */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-2xl bg-cyan-300/10 p-3">
                  <Users className="h-6 w-6 text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold">AI Agents</h3>
              </div>
              <p className="text-slate-300 mb-6">
                Intelligent agents that engage customers, handle conversations,
                and drive business growth.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Customer support chatbot resolves 70% of inquiries",
                  "Appointment scheduler books 24/7 without manual work",
                  "Lead qualifier screens prospects and prioritizes hot leads",
                  "Email responder handles FAQs and follow-ups instantly",
                  "Multi-channel deployment on website, email, and messaging",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <CheckCircle2 className="h-5 w-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/examples"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-sm hover:border-white/40 hover:bg-white/5 transition-colors font-medium"
              >
                See agent examples <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* WORKFLOW AUTOMATIONS */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-2xl bg-cyan-300/10 p-3">
                  <Workflow className="h-6 w-6 text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold">Workflow Automations</h3>
              </div>
              <p className="text-slate-300 mb-6">
                Backend automations that handle data, systems, and compliance
                without human intervention.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Auto-process invoices, quotes, and payment reminders",
                  "Update CRM, databases, and tools in real-time",
                  "Generate audit logs and compliance documentation",
                  "Route leads to the right team automatically",
                  "Sync data across all your business systems",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <CheckCircle2 className="h-5 w-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/examples"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-sm hover:border-white/40 hover:bg-white/5 transition-colors font-medium"
              >
                See automation examples <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* SYNERGY SECTION */}
          <div className="mt-12 rounded-3xl border border-cyan-300/30 bg-slate-900/80 p-8">
            <h3 className="text-lg font-semibold mb-4">
              The Magic: When Used Together
            </h3>
            <p className="text-slate-300 mb-6">
              Agents and automations create a powerful synergy. When a customer
              books an appointment through your agent, automations instantly
              create the calendar entry, send reminders, and prepare internal
              documents. When a lead is qualified, automations route them to
              sales and update the CRM while the agent handles the conversation.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Complete Coverage",
                  desc: "Customer-facing and backend operations run 24/7",
                },
                {
                  title: "Zero Manual Work",
                  desc: "Every handoff is automated. No data re-entry.",
                },
                {
                  title: "Maximum ROI",
                  desc: "More revenue + lower costs = faster payback",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-slate-950/40 p-4 border border-cyan-300/20"
                >
                  <div className="font-semibold text-sm mb-2">{item.title}</div>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
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
            Deploy with confidence knowing your customer data is protected to
            the same standards as Fortune 500 companies and U.S. government
            agencies.
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
                title: "Work for you, not against you",
                copy: "Agents drive revenue, automations reduce costs. Use one or both to fit your needs.",
              },
              {
                icon: Zap,
                title: "Fast to market",
                copy: "Agents deploy in 24 hours. Automations take days. No long implementation cycles.",
              },
              {
                icon: BadgeCheck,
                title: "Affordable, flexible pricing",
                copy: "Start small with agents or automations. Scale as you grow. Starting at $1,500/month.",
              },
              {
                icon: Shield,
                title: "Enterprise security included",
                copy: "DoD-grade security standards. Compliance ready. Built in, not bolted on.",
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
            ROI that pays for itself in weeks
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Starting at $1,500/month. Whether you choose agents, automations, or
            both—you'll see measurable results within weeks.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* AI AGENTS ROI */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                AI Agents ROI
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                Direct revenue generation
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Appointment schedulers and chatbots generate new revenue by
                capturing opportunities 24/7 that would otherwise be lost.
              </p>
              <div className="mt-4 rounded-lg bg-slate-950/40 p-4 border border-cyan-300/20">
                <p className="text-xs text-slate-400">
                  New annual revenue from agents:
                </p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">
                  $25,000-50,000+
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  (service businesses booking 100+ appointments/month)
                </p>
              </div>
            </div>

            {/* WORKFLOW AUTOMATIONS ROI */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                Automation Savings
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                Eliminate manual work and errors
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Invoice processing, CRM updates, and data entry automations save
                time and eliminate costly manual errors.
              </p>
              <div className="mt-4 rounded-lg bg-slate-950/40 p-4 border border-cyan-300/20">
                <p className="text-xs text-slate-400">
                  Annual labor hours saved:
                </p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">
                  500-1000+ hours/year
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  (valued at $10,000-30,000 in labor costs)
                </p>
              </div>
            </div>

            {/* AGENT + AUTOMATION SYNERGY */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                Combined Effect
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                More leads + better efficiency
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                When agents generate leads, automations instantly process them,
                update systems, and route to your team. Zero friction, maximum
                conversion.
              </p>
              <div className="mt-4 rounded-lg bg-slate-950/40 p-4 border border-cyan-300/20">
                <p className="text-xs text-slate-400">
                  Manual work eliminated:
                </p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">
                  40+ hours/month
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  (data entry, routing, follow-ups)
                </p>
              </div>
            </div>

            {/* Agents + Automation ROI */}
            <div className="rounded-2xl border border-cyan-300/30 bg-slate-900/80 p-6">
              <div className="text-sm text-cyan-300 font-medium uppercase tracking-wider">
                Combined Strategy ROI
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                $40,000-80,000 in first-year value
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                New revenue from agents plus labor savings from automations. At
                $1,500/month cost ($18k/year), that's 2-4x return on investment.
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex gap-2 text-sm">
                  <span className="text-cyan-300 font-semibold">
                    New revenue:
                  </span>
                  <span className="text-slate-300">$25,000-50,000</span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="text-cyan-300 font-semibold">
                    Labor saved:
                  </span>
                  <span className="text-slate-300">$10,000-30,000</span>
                </div>
                <div className="flex gap-2 text-sm border-t border-cyan-300/20 pt-3 mt-3">
                  <span className="text-cyan-300 font-semibold">
                    Total value:
                  </span>
                  <span className="text-slate-300">$40,000-80,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/60 p-8">
            <h3 className="text-lg font-semibold">
              The impact across the board
            </h3>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-cyan-300">
                  20%+ revenue
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  From agents capturing opportunities 24/7
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-300">
                  40+ hrs/month
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  From automations eliminating manual work
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-300">2-4x ROI</div>
                <p className="mt-2 text-sm text-slate-300">
                  Payback in weeks, not months or years
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm shadow inline-flex items-center gap-2 hover:bg-slate-100 transition-colors font-medium"
            >
              Book your strategy call
            </a>
            <a
              href="/examples"
              className="rounded-2xl border border-white/20 px-5 py-3 text-sm inline-flex items-center gap-2 hover:border-white/40 hover:bg-white/5 transition-colors font-medium"
            >
              See both agent and automation examples
            </a>
          </div>
        </div>
      </section>

      {/* TRUST & TESTIMONIALS */}
      <section className="border-t border-white/10 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Real results with agents and automations
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Whether using agents alone, automations alone, or both—SMBs are
            seeing immediate impact on their bottom line.
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
              <div className="mb-3 text-xs text-slate-400 font-semibold uppercase">
                Using AI Agents
              </div>
              <blockquote className="text-base text-slate-100 italic mb-4">
                "The appointment scheduler agent booked 200+ meetings in month
                one. That's $15,000 in revenue we would've lost without it."
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
              <div className="mb-3 text-xs text-slate-400 font-semibold uppercase">
                Using Workflow Automations
              </div>
              <blockquote className="text-base text-slate-100 italic mb-4">
                "Invoice processing went from 6 hours a week to fully automated.
                That's one team member who can now focus on strategy instead of
                data entry."
              </blockquote>
              <p className="text-sm text-slate-400">
                VP Operations, E-Commerce Company
              </p>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Deployed in 24 hours",
              "Zero IT overhead",
              "Enterprise-grade security included",
              "Works with your existing tools",
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

      {/* AI AGENTS SHOWCASE */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            What AI Agents Do
          </h2>
          <p className="text-slate-300 max-w-3xl mb-12">
            Intelligent agents that work 24/7 on your behalf. They learn your
            business, engage your customers, and drive measurable results while
            your team focuses on strategy and growth.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Customer Support Agent",
                description:
                  "Answers questions, resolves issues, and escalates complex problems to your team",
                impact: "Handles 70% of support inquiries automatically",
                icon: MessageSquare,
              },
              {
                title: "Appointment Scheduler",
                description:
                  "Books meetings, sends confirmations, and manages reminders without manual work",
                impact: "Books 100+ appointments per month",
                icon: Clock,
              },
              {
                title: "Lead Qualifier",
                description:
                  "Screens inbound leads, asks qualifying questions, and routes hot prospects to sales",
                impact: "Improves lead quality by 40%+",
                icon: Users,
              },
            ].map((agent) => {
              const Icon = agent.icon;
              return (
                <div
                  key={agent.title}
                  className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 flex flex-col"
                >
                  <div className="p-3 rounded-xl bg-cyan-300/20 text-cyan-300 w-fit mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{agent.title}</h3>
                  <p className="text-slate-300 text-sm mb-4 flex-grow">
                    {agent.description}
                  </p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm font-semibold text-cyan-300">
                      {agent.impact}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl border border-cyan-300/30 bg-slate-900/80 p-8 mb-8">
            <h3 className="text-xl font-bold mb-4">
              Why AI Agents Matter for SMBs
            </h3>
            <p className="text-slate-300 mb-6">
              Traditional support models have a critical flaw: they only work
              during business hours. AI agents work 24/7. They never get tired,
              never give inconsistent answers, and never miss an opportunity to
              engage a customer.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  stat: "20%+ revenue increase",
                  desc: "From capturing opportunities agents find",
                },
                {
                  stat: "60% support cost reduction",
                  desc: "From handling routine inquiries",
                },
                {
                  stat: "24/7 availability",
                  desc: "No more missed leads after hours",
                },
              ].map((item) => (
                <div
                  key={item.stat}
                  className="rounded-2xl bg-slate-950/40 p-4 border border-white/10"
                >
                  <div className="font-semibold text-cyan-300 mb-1">
                    {item.stat}
                  </div>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <a
              href="/examples"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3 text-sm hover:border-white/40 hover:bg-white/5 transition-colors font-medium"
            >
              See more agent examples <ArrowRight className="h-4 w-4" />
            </a>
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Microsoft", desc: "Azure & Copilot" },
              { name: "OpenAI", desc: "AI Models" },
              { name: "n8n", desc: "Automation" },
              { name: "Power Automate", desc: "Workflows" },
              { name: "Slack", desc: "Communication" },
              { name: "HubSpot", desc: "CRM" },
            ].map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center justify-center p-6 h-40 rounded-2xl border border-white/10 bg-slate-900/40 hover:border-white/20 transition-colors"
              >
                <div className="text-xl font-bold text-cyan-300 mb-3 text-center leading-tight">
                  {partner.name}
                </div>
                <p className="text-sm text-slate-400 text-center">
                  {partner.desc}
                </p>
              </div>
            ))}
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
            Ready to deploy your first AI agent?
          </h2>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Book a 30-minute strategy call. We'll identify your biggest revenue
            opportunity and show you exactly how agents can deliver it.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm shadow inline-flex items-center gap-2 hover:bg-slate-100 transition-colors font-medium"
            >
              Book a strategy call
            </a>
            <a
              href="/checkup"
              className="rounded-2xl border border-white/20 px-5 py-3 text-sm inline-flex items-center gap-2 hover:border-white/40 hover:bg-white/5 transition-colors font-medium"
            >
              Take the AI security checkup
            </a>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="mt-12 grid md:grid-cols-2 gap-4 max-w-2xl"
          >
            <input
              type="text"
              name="name"
              value={contactForm.name ?? ""}
              onChange={handleContactChange}
              required
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={contactForm.email ?? ""}
              onChange={handleContactChange}
              required
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              placeholder="Work email"
            />
            <input
              type="tel"
              name="phone"
              value={contactForm.phone ?? ""}
              onChange={handleContactChange}
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              placeholder="Phone (optional)"
            />
            <input
              type="text"
              name="company"
              value={contactForm.company ?? ""}
              onChange={handleContactChange}
              required
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 md:col-span-2 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              placeholder="Company name"
            />
            <textarea
              name="message"
              value={contactForm.message ?? ""}
              onChange={handleContactChange}
              required
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 md:col-span-2 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              rows={5}
              placeholder="What's your biggest revenue opportunity? (e.g., booking more appointments, closing sales faster, supporting customers better)"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm w-fit font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Schedule call"}
            </button>
          </form>
          <p className="mt-6 text-xs text-slate-500">
            By submitting, you agree to our privacy notice. We'll contact you
            within 2 hours.
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
