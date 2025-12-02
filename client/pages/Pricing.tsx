import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { apiUrl, getEnvVar } from "../lib/api";

interface PricingTier {
  id: string;
  tier: number;
  name: string;
  price: string;
  billing: string;
  description: string;
  included: string[];
  limits?: string[];
  special?: string;
  highlighted?: boolean;
  cta: string;
}

const CONSULTATION_ENDPOINT = apiUrl(
  getEnvVar("VITE_CONTACT_FORM_PATH") ?? "contact",
);

const pricingTiers: PricingTier[] = [
  {
    id: "free-consultation",
    tier: 0,
    name: "Free AI & Automation Consultation",
    price: "$0",
    billing: "20–30 minutes",
    description: "Understand your workflows, identify opportunities, and plan securely.",
    included: [
      "Assess your workflows & bottlenecks",
      "Identify automation & AI agent opportunities",
      "Review security & compliance considerations",
      "Provide a recommended implementation plan",
      "No commitment required",
    ],
    cta: "Schedule Free Consultation",
  },
  {
    id: "foundations",
    tier: 1,
    name: "AI Foundations & Secure Setup",
    price: "Starting at $1,500",
    billing: "One-time project",
    description: "Securely deploy your first 1–2 AI agents or automated workflows.",
    included: [
      "60–90 min deep-dive strategy session",
      "Security & compliance readiness review",
      "Setup of secure data access controls, permissions, & API keys",
      "Deployment of 1–2 AI agents or automated workflows",
      "Tool configuration (CRM, inbox, databases, HR tools, etc.)",
      "Documentation + SOPs",
      "14-day post-launch support",
    ],
    limits: [
      "Includes up to 2 tasks/workflows",
      "Additional tasks billed separately or added to custom SOW",
    ],
    special: "✔ 24–48 hr rush delivery available (+30–50% premium)",
    highlighted: true,
    cta: "Get Started",
  },
  {
    id: "growth",
    tier: 2,
    name: "AI Growth Automation Retainer",
    price: "Starting at $1,500/month",
    billing: "Monthly retainer",
    description: "Continuous AI development, optimization, and secure automation management.",
    included: [
      "5–10 tasks per month (builds, updates, optimizations, integrations)",
      "Ongoing monitoring & optimization of AI agents",
      "Monthly security & compliance review",
      "Integration support across your tech stack",
      "1 strategy call per month",
      "Documentation for all new builds",
      "Priority email & Slack support",
    ],
    limits: [
      "Minimum 5 tasks per month",
      "Maximum 10 tasks per month",
      "Additional tasks billed hourly or via SOW",
    ],
    special: "✔ Rush work (24–48 hr) incurs 25–40% fee",
    cta: "Schedule Consultation",
  },
  {
    id: "operations",
    tier: 3,
    name: "Secure AI Operations Partner",
    price: "$4,000–$8,000/month",
    billing: "Monthly retainer",
    description: "Your outsourced AI Ops team — secure, compliant, scalable.",
    included: [
      "Unlimited requests (completed one at a time)",
      "10–20 completed tasks per month on average",
      "Multi-department automation (sales, HR, ops, finance, support)",
      "Advanced AI agent development + orchestration",
      "Security-first workflow design",
      "GDPR/HIPAA/SOC2-minded data handling",
      "Continuous monitoring + preventative maintenance",
      "Weekly strategy calls",
      "Dedicated AI Automation Manager",
      "Full documentation & SOPs for all systems",
      "Team onboarding & training",
    ],
    limits: [
      "Typical range: 10–20 tasks/month",
      "Additional tasks beyond range may require added capacity",
      "Recommended 3-month minimum commitment",
    ],
    special: "✔ Rush tasks (24–48 hr) incur 40–60% premium",
    cta: "Schedule Consultation",
  },
  {
    id: "custom",
    tier: 4,
    name: "Custom AI Automation Projects",
    price: "Starting at $2,000+",
    billing: "Custom quote",
    description: "Complex automation needs requiring tailored solutions.",
    included: [
      "AI customer support agent with secure knowledge base",
      "Automated onboarding with compliant data workflows",
      "Operations & finance AI agents with audit trails",
      "Complex multi-step business automations",
      "Document-intake AI agents",
      "CRM + AI workflow orchestration",
    ],
    limits: [
      "Price determined after assessment + SOW",
      "Projects may be fixed-fee or phased",
    ],
    special: "✔ 24–48 hr rush delivery when feasible (+30–50% surcharge)",
    cta: "Request Custom Quote",
  },
];

export default function Pricing() {
  const [submitting, setSubmitting] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleCTA = async (tierId: string) => {
    setSelectedTier(tierId);
    setSubmitting(true);

    try {
      const tier = pricingTiers.find((t) => t.id === tierId);
      const payload = {
        name: "",
        email: "",
        phone: "",
        company: "",
        message: `Interested in: ${tier?.name}`,
        source: "Pricing Page CTA",
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch(CONSULTATION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const modal = document.querySelector(
          "[data-pricing-modal]",
        ) as HTMLDialogElement;
        modal?.showModal?.();
      } else {
        alert("Error scheduling consultation. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error scheduling consultation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-cyan-300">
            Secure Automations
          </a>
          <nav className="flex gap-6">
            <a href="/" className="text-sm hover:text-cyan-300 transition-colors">
              Home
            </a>
            <a href="/examples" className="text-sm hover:text-cyan-300 transition-colors">
              Solutions
            </a>
            <a href="/pricing" className="text-sm text-cyan-300">
              Pricing
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-white/10 bg-gradient-to-b from-slate-900/40 to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Secure AI Automation
              <span className="block text-cyan-300">Transparent Pricing</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              We help SMBs safely deploy AI agents and automations with a strong emphasis on security, data protection, and compliance. Every engagement begins with a FREE consultation.
            </p>
            <p className="text-sm text-slate-400">
              ✔ No hidden fees • ✔ Flexible engagements • ✔ Security-first approach
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl border transition-all ${
                tier.highlighted
                  ? "border-cyan-300/50 bg-slate-900/80 shadow-lg shadow-cyan-300/10 md:col-span-2 lg:col-span-1 lg:scale-105"
                  : "border-white/10 bg-slate-900/40 hover:border-white/20"
              }`}
            >
              <div className="p-8">
                {/* Tier Header */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-2xl font-bold">{tier.name}</h3>
                    {tier.highlighted && (
                      <span className="text-xs px-2 py-1 rounded-full bg-cyan-300/20 text-cyan-300">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{tier.description}</p>
                  <div className="mb-1">
                    <span className="text-4xl font-bold text-cyan-300">
                      {tier.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{tier.billing}</p>
                </div>

                {/* Included Features */}
                <div className="mb-6 space-y-3 min-h-48">
                  {tier.included.map((feature, i) => (
                    <div key={i} className="flex gap-3">
                      <Check className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Limits */}
                {tier.limits && (
                  <div className="mb-6 pt-6 border-t border-white/5">
                    <p className="text-xs font-semibold text-slate-400 mb-3">
                      Scope & Limits
                    </p>
                    <ul className="space-y-2">
                      {tier.limits.map((limit, i) => (
                        <li key={i} className="text-xs text-slate-400">
                          • {limit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Special Note */}
                {tier.special && (
                  <div className="mb-6 p-3 rounded-lg bg-slate-800/50 border border-white/5">
                    <p className="text-xs text-slate-300">{tier.special}</p>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => handleCTA(tier.id)}
                  disabled={submitting && selectedTier === tier.id}
                  className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    tier.highlighted
                      ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200 disabled:opacity-50"
                      : "border border-white/20 text-white hover:bg-white/5 disabled:opacity-50"
                  }`}
                >
                  {submitting && selectedTier === tier.id ? (
                    "Scheduling..."
                  ) : (
                    <>
                      {tier.cta}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Terms Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20 p-8 rounded-2xl border border-white/10 bg-slate-900/40"
        >
          <h3 className="text-lg font-semibold mb-6">Important Terms & Boundaries</h3>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-300">
            <div>
              <h4 className="font-semibold text-white mb-3">Third-Party Fees</h4>
              <p className="text-slate-400">
                External software (AI tools, automation platforms, CRMs, databases) are NOT included in our pricing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Assessment & SOW</h4>
              <p className="text-slate-400">
                All pricing is subject to refinement after the initial assessment. A formal Statement of Work (SOW) defines deliverables, task limits, timelines, and pricing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Task Definition</h4>
              <p className="text-slate-400">
                Tasks include AI agent builds, workflow automations, integrations, workflow updates, security/compliance additions, testing & QA, and optimization work.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Fair Use</h4>
              <p className="text-slate-400">
                Unlimited requests ≠ unlimited workload. Work is completed one task at a time with typical throughput defined in each package.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Schedule your free 20–30 minute consultation today. We'll assess your workflows, identify AI opportunities, and provide a tailored implementation plan—no commitment required.
          </p>
          <button
            onClick={() => handleCTA("free-consultation")}
            disabled={submitting && selectedTier === "free-consultation"}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-300 text-slate-950 font-semibold hover:bg-cyan-200 transition-colors disabled:opacity-50"
          >
            {submitting && selectedTier === "free-consultation"
              ? "Scheduling..."
              : "Schedule Your Free Consultation"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-400 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Secure Automations</span>
          <div className="flex gap-6">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="/examples" className="hover:text-white transition-colors">
              Solutions
            </a>
            <a href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
