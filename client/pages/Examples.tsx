import React from "react";
import {
  MessageSquare,
  FileText,
  BarChart3,
  UserCheck,
  Zap,
} from "lucide-react";

export default function ExamplesPage() {
  const workflows = [
    {
      icon: MessageSquare,
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
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-white text-slate-950 font-black flex items-center justify-center">
              SA
            </div>
            <span className="font-semibold tracking-tight">
              Secure Automations
            </span>
          </div>
          <a
            href="/"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Back to Home
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Example Workflows
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl">
            See how Secure Automations helps businesses across industries save
            time, reduce risk, and stay compliant.
          </p>
        </div>

        <div className="space-y-8">
          {workflows.map((workflow, index) => {
            const Icon = workflow.icon;
            return (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-slate-900/60 overflow-hidden hover:border-white/20 transition-colors"
              >
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-cyan-300/20 text-cyan-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">{workflow.title}</h2>
                      <p className="mt-2 text-slate-300 text-lg">
                        {workflow.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        Key Benefits
                      </h3>
                      <ul className="space-y-3">
                        {workflow.benefits.map((benefit, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="text-cyan-300 font-bold mt-1">
                              ✓
                            </span>
                            <span className="text-slate-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        Compliance Frameworks
                      </h3>
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

                      <div className="mt-6">
                        <a
                          href="/#contact"
                          className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-medium transition-colors"
                        >
                          Request a custom workflow →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">Don't see your use case?</h2>
          <p className="text-slate-300 text-lg mb-6 max-w-2xl">
            Every business has unique automation needs. Our team can design
            custom workflows for your specific requirements, all built with
            enterprise-grade security and compliance controls.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-950 px-6 py-3 text-sm shadow hover:bg-slate-100 transition-colors font-medium"
          >
            Let's discuss your workflows
          </a>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="font-semibold text-cyan-300 mb-3">
              All workflows include:
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
            <h2 className="text-2xl font-bold">Ready to automate securely?</h2>
            <p className="mt-3 text-slate-300">
              Let's talk about your automation goals and compliance
              requirements.
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
