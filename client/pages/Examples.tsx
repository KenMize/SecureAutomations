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

interface ConsultationFormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

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
      const response = await fetch("/api/contact-form", {
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
    {
      icon: Zap,
      title: "Data Classification & Remediation",
      description:
        "Automatically classify sensitive data, flag misconfigurations, and trigger remediation workflows with audit trails.",
      benefits: [
        "Discover and protect PHI/PII automatically",
        "Real-time data governance",
        "Compliance with GDPR/CCPA data rights",
        "Integrates with DLP tools and SIEMs",
      ],
      compliance: ["GDPR", "HIPAA", "CCPA"],
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
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-slate-900/60 overflow-hidden hover:border-white/20 transition-colors p-8"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-cyan-300/20 text-cyan-300 flex-shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{agent.title}</h3>
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

                  <div>
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
                </div>
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
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-slate-900/60 overflow-hidden hover:border-white/20 transition-colors p-8"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-cyan-300/20 text-cyan-300 flex-shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{workflow.title}</h3>
                      <p className="mt-2 text-slate-300 text-sm">
                        {workflow.description}
                      </p>
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
                </div>
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
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-950 px-6 py-3 text-sm shadow hover:bg-slate-100 transition-colors font-medium"
          >
            Schedule a consultation
          </a>
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
            <a
              href="/#contact"
              className="rounded-2xl bg-white text-slate-950 px-6 py-3 text-sm shadow inline-flex items-center justify-center hover:bg-slate-100 transition-colors font-medium"
            >
              Book a consultation
            </a>
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
