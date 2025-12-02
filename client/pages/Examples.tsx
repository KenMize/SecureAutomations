import React, { useState } from "react";
import {
  MessageSquare,
  FileText,
  BarChart3,
  UserCheck,
  Zap,
  Users,
  Clock,
} from "lucide-react";
import { apiUrl, getEnvVar } from "../lib/api";

interface ConsultationFormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

const CONSULTATION_ENDPOINT = apiUrl(
  getEnvVar("VITE_CONTACT_FORM_PATH") ?? "contact-form",
);

export default function ExamplesPage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [consultationForm, setConsultationForm] =
    useState<ConsultationFormState>({
      name: "",
      email: "",
      company: "",
      message: "",
    });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConsultationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setConsultationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(CONSULTATION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(consultationForm),
      });

      if (response.ok) {
        setConsultationForm({
          name: "",
          email: "",
          company: "",
          message: "",
        });
        alert("Thank you! We'll contact you within 2 hours.");
        setShowConsultationModal(false);
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

  const agents = [
    {
      id: "support",
      icon: MessageSquare,
      title: "Customer Support Chatbot",
      description:
        "24/7 AI agent that answers FAQs, handles common requests, and escalates complex issues to your team.",
      benefits: [
        "Handles 70% of support inquiries automatically",
        "Instant responses to customers",
        "Seamless handoff to support team",
        "Works on website, email, and messaging",
      ],
      compliance: ["SOC 2", "GDPR"],
    },
    {
      id: "scheduler",
      icon: Clock,
      title: "Appointment Scheduler Agent",
      description:
        "Intelligent agent that books appointments, sends confirmations, and reminds customers automatically.",
      benefits: [
        "Books 100+ appointments per month",
        "Reduces scheduling admin time by 90%",
        "Automatic reminders reduce no-shows",
        "Integrates with your calendar",
      ],
      compliance: ["GDPR", "CCPA"],
    },
    {
      id: "lead",
      icon: BarChart3,
      title: "Lead Qualifier Agent",
      description:
        "AI agent that qualifies inbound leads, asks qualifying questions, and routes to the right sales person.",
      benefits: [
        "Qualifies leads 24/7 before they reach your team",
        "Improves lead quality by 40%+",
        "Prioritizes hot leads automatically",
        "Works with forms, email, and chat",
      ],
      compliance: ["GDPR", "SOC 2"],
    },
  ];

  const workflows = [
    {
      id: "support",
      icon: FileText,
      title: "Customer Support Automation",
      description:
        "Classify incoming support tickets, draft responses, and route to the right team. Redact PII before logging.",
      benefits: [
        "50-60 hours/month saved on ticket triage",
        "Faster first-response times",
        "Compliance-ready audit logs",
        "Works with Slack, HubSpot, Zendesk",
      ],
      compliance: ["SOC 2", "GDPR"],
    },
    {
      id: "contract",
      icon: FileText,
      title: "Contract & Document Review",
      description:
        "Extract key terms, identify risks, and generate summaries from contracts and agreements. All with data protection built in.",
      benefits: [
        "Eliminate 20-30 hours/month of manual review",
        "Standardized risk assessment",
        "Secure document handling with encryption",
        "Integrates with SharePoint, OneDrive, Google Drive",
      ],
      compliance: ["ISO 27001", "HIPAA"],
    },
    {
      id: "compliance",
      icon: BarChart3,
      title: "Compliance Reporting Automation",
      description:
        "Generate SOC 2, NIST 800-53, and audit reports automatically from your systems. Real-time compliance dashboards.",
      benefits: [
        "Cut audit prep time from 8 weeks to 2 weeks",
        "Always-current evidence trails",
        "Tamper-proof audit logs",
        "Reduce consultant dependency",
      ],
      compliance: ["SOC 2", "NIST 800-53", "ISO 27001"],
    },
    {
      id: "iam",
      icon: UserCheck,
      title: "Identity & Access Management Sync",
      description:
        "Keep user access in sync across systems. Enforce least-privilege, manage role changes, and track access reviews.",
      benefits: [
        "Eliminate manual access provisioning",
        "Real-time deprovisioning for departing staff",
        "Quarterly access review automation",
        "Syncs with Entra ID, Okta, Active Directory",
      ],
      compliance: ["Zero Trust", "NIST 800-53", "ISO 27001"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src="/logo.svg" alt="Secure Automations" className="h-8 w-8" />
            <span className="font-semibold tracking-tight">
              Secure Automations
            </span>
          </a>
          <a
            href="/"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Back to Home
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            AI Agents & Workflow Automations
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl">
            See how AI agents and workflow automations help SMBs drive revenue,
            reduce costs, and stay compliant.
          </p>
        </div>

        {/* AI AGENTS SECTION */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">AI Agents</h2>
            <p className="text-slate-300 text-lg">
              Customer-facing agents that work 24/7 to engage customers and
              drive revenue.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              return (
                <a
                  key={index}
                  href={`/demo/${agent.id}`}
                  className="rounded-3xl border border-white/10 bg-slate-900/60 overflow-hidden hover:border-cyan-300/50 hover:bg-slate-900/80 transition-all cursor-pointer group p-8 block"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-cyan-300/20 text-cyan-300 flex-shrink-0 group-hover:bg-cyan-300/30 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">
                    {agent.title}
                  </h3>
                  <p className="text-slate-300 mb-6 text-sm">
                    {agent.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {agent.benefits.map((benefit, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <span className="text-cyan-300 font-bold flex-shrink-0">
                            ✓
                          </span>
                          <span className="text-slate-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Compliance
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {agent.compliance.map((comp, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-full bg-slate-800/60 px-3 py-1 text-xs font-medium text-cyan-300 border border-cyan-300/30"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4 text-cyan-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Try Demo →
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* WORKFLOW AUTOMATIONS SECTION */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Workflow Automations</h2>
            <p className="text-slate-300 text-lg">
              Backend automations that handle data, systems, and compliance
              without human intervention.
            </p>
          </div>
          <div className="space-y-6">
            {workflows.map((workflow, index) => {
              const Icon = workflow.icon;
              return (
                <a
                  key={index}
                  href={`/workflow/${workflow.id}`}
                  className="rounded-3xl border border-white/10 bg-slate-900/60 overflow-hidden hover:border-cyan-300/50 hover:bg-slate-900/80 transition-all cursor-pointer group block p-8"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-cyan-300/20 text-cyan-300 flex-shrink-0 group-hover:bg-cyan-300/30 transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold group-hover:text-cyan-300 transition-colors">
                        {workflow.title}
                      </h3>
                      <p className="mt-2 text-slate-300 text-sm">
                        {workflow.description}
                      </p>
                    </div>
                    <div className="ml-4 text-cyan-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Try Demo →
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        Key Benefits
                      </h4>
                      <ul className="space-y-2">
                        {workflow.benefits.map((benefit, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span className="text-cyan-300 font-bold flex-shrink-0">
                              ✓
                            </span>
                            <span className="text-slate-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        Compliance Frameworks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {workflow.compliance.map((comp, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-full bg-slate-800/60 px-3 py-1 text-xs font-medium text-cyan-300 border border-cyan-300/30"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">Need something custom?</h2>
          <p className="text-slate-300 text-lg mb-6 max-w-2xl">
            Every business has unique needs. Whether you need a custom AI agent
            or automation workflow, our team can build exactly what you need—all
            with enterprise-grade security.
          </p>
          <button
            onClick={() => setShowConsultationModal(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-950 px-6 py-3 text-sm shadow hover:bg-slate-100 transition-colors font-medium"
          >
            Schedule a consultation
          </button>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="font-semibold text-cyan-300 mb-3">
              All solutions include:
            </h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>Tamper-proof audit logging</li>
              <li>Role-based access control</li>
              <li>Data redaction & encryption</li>
              <li>Compliance-ready reporting</li>
              <li>Ongoing security monitoring</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="font-semibold text-cyan-300 mb-3">
              Tools we integrate with:
            </h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>Microsoft 365 & Azure</li>
              <li>Slack, Teams, HubSpot</li>
              <li>n8n, Power Automate, Zapier</li>
              <li>Salesforce, ServiceNow</li>
              <li>Your custom APIs & databases</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CONSULTATION MODAL */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="rounded-3xl border border-white/10 bg-slate-900/95 p-8 md:p-12 max-w-2xl w-full shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Book a Consultation</h2>
              <button
                onClick={() => setShowConsultationModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 mb-6">
              Tell us about your needs and we'll get back to you within 2 hours.
            </p>

            <form onSubmit={handleConsultationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={consultationForm.name ?? ""}
                  onChange={handleConsultationChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={consultationForm.email ?? ""}
                  onChange={handleConsultationChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
                  placeholder="your@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={consultationForm.company ?? ""}
                  onChange={handleConsultationChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={consultationForm.message ?? ""}
                  onChange={handleConsultationChange}
                  required
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your needs..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-white text-slate-950 px-4 py-3 font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isSubmitting ? "Submitting..." : "Send Consultation Request"}
              </button>

              <p className="text-xs text-slate-500 text-center">
                We'll never share your data. You can unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      )}

      <section className="border-t border-white/10 bg-slate-950 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Ready to get started?</h2>
            <p className="mt-3 text-slate-300">
              Let's talk about your goals with AI agents and workflow
              automations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowConsultationModal(true)}
              className="rounded-2xl bg-white text-slate-950 px-6 py-3 text-sm shadow inline-flex items-center justify-center hover:bg-slate-100 transition-colors font-medium"
            >
              Book a consultation
            </button>
            <a
              href="/checkup"
              className="rounded-2xl border border-white/20 px-6 py-3 text-sm inline-flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-colors font-medium"
            >
              Take the security checkup
            </a>
          </div>
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
