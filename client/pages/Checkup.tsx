import React, { useState, useCallback, memo } from "react";
import { ChevronRight } from "lucide-react";

interface FormData {
  company_name: string;
  contact_name: string;
  contact_title: string;
  work_email: string;
  industry: string;
  company_size: string;
  security_policy: string;
  roles_assigned: string;
  asset_inventory: string;
  data_classification: string;
  sso_enabled: string;
  mfa_required: string;
  least_privilege: string;
  access_reviewed: string;
  encryption: string;
  gdpr_support: string;
  phi_pii_secured: string;
  retention_policy: string;
  ai_bias_reviewed: string;
  ai_governance: string;
  model_logging: string;
  output_review: string;
  security_logs: string;
  tamper_proof: string;
  change_management: string;
  vendor_assessment: string;
  incident_response: string;
  breach_training: string;
  backup_testing: string;
  certifications: string[];
  audit_timeline: string;
  request_report: string;
  additional_notes: string;
}

interface ComplianceResult {
  score: number;
  complianceScores: Record<string, number>;
  company: string;
  timestamp: string;
}

const SEND_EMAIL_ENDPOINT = "/api/send-email";

const TextField = memo(
  ({
    label,
    placeholder,
    value,
    onChange,
    required = false,
  }: {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type="text"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
      />
    </div>
  ),
);

TextField.displayName = "TextField";

const SelectField = memo(
  ({
    label,
    options,
    value,
    onChange,
    required = false,
  }: {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  ),
);

SelectField.displayName = "SelectField";

const SECTIONS = [
  {
    id: 1,
    title: "Organization Overview",
    description:
      "Tell us about your organization and primary contact information",
  },
  {
    id: 2,
    title: "Governance & Policy",
    description: "Security governance and policy framework",
  },
  {
    id: 3,
    title: "Access Control / Zero Trust",
    description: "Access management and authentication",
  },
  {
    id: 4,
    title: "Data Protection & Privacy",
    description: "Data encryption and compliance",
  },
  {
    id: 5,
    title: "AI Governance",
    description: "AI model oversight and controls",
  },
  {
    id: 6,
    title: "Audit & Monitoring",
    description: "Security logging and change management",
  },
  {
    id: 7,
    title: "Incident Response & Continuity",
    description: "Incident response and business continuity",
  },
  {
    id: 8,
    title: "Certifications & Goals",
    description: "Current certifications and compliance timeline",
  },
];

export default function CheckupPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    company_name: "",
    contact_name: "",
    contact_title: "",
    work_email: "",
    industry: "",
    company_size: "",
    security_policy: "",
    roles_assigned: "",
    asset_inventory: "",
    data_classification: "",
    sso_enabled: "",
    mfa_required: "",
    least_privilege: "",
    access_reviewed: "",
    encryption: "",
    gdpr_support: "",
    phi_pii_secured: "",
    retention_policy: "",
    ai_bias_reviewed: "",
    ai_governance: "",
    model_logging: "",
    output_review: "",
    security_logs: "",
    tamper_proof: "",
    change_management: "",
    vendor_assessment: "",
    incident_response: "",
    breach_training: "",
    backup_testing: "",
    certifications: [],
    audit_timeline: "",
    request_report: "",
    additional_notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<ComplianceResult | null>(null);

  const currentSectionData = SECTIONS[currentSection];
  const progress = ((currentSection + 1) / SECTIONS.length) * 100;

  const handleChangeCallback = useCallback(
    (field: keyof FormData, value: string | string[]) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleCertificationChange = (cert: string) => {
    setFormData((prev) => {
      const certs = prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert];
      return { ...prev, certifications: certs };
    });
  };

  const calculateComplianceScores = () => {
    const frameworks: Record<string, number> = {
      "NIST 800-53": 0,
      "SOC 2 (TSC)": 0,
      "ISO/IEC 27001": 0,
      "ISO/IEC 42001": 0,
      HIPAA: 0,
      GDPR: 0,
    };

    const yes = 1,
      no = 0;

    frameworks["NIST 800-53"] = Math.round(
      (((formData.security_policy === "Yes" ? yes : no) +
        (formData.roles_assigned === "Yes" ? yes : no) +
        (formData.access_reviewed === "Yes" ? yes : no) +
        (formData.security_logs === "Yes" ? yes : no) +
        (formData.incident_response === "Yes" ? yes : no)) /
        5) *
        100,
    );

    frameworks["SOC 2 (TSC)"] = Math.round(
      (((formData.security_policy === "Yes" ? yes : no) +
        (formData.mfa_required === "Yes" ? yes : no) +
        (formData.encryption === "Yes" ? yes : no) +
        (formData.security_logs === "Yes" ? yes : no) +
        (formData.breach_training === "Yes" ? yes : no)) /
        5) *
        100,
    );

    frameworks["ISO/IEC 27001"] = Math.round(
      (((formData.security_policy === "Yes" ? yes : no) +
        (formData.asset_inventory === "Yes" ? yes : no) +
        (formData.access_reviewed === "Yes" ? yes : no) +
        (formData.least_privilege === "Always" ? yes : no) +
        (formData.change_management === "Yes" ? yes : no)) /
        5) *
        100,
    );

    frameworks["ISO/IEC 42001"] = Math.round(
      (((formData.ai_governance === "Yes" ? yes : no) +
        (formData.ai_bias_reviewed === "Yes" ? yes : no) +
        (formData.model_logging === "Yes" ? yes : no) +
        (formData.output_review === "Regularly" ? yes : no)) /
        4) *
        100,
    );

    frameworks["HIPAA"] = Math.round(
      (((formData.phi_pii_secured === "Yes" ? yes : no) +
        (formData.encryption === "Yes" ? yes : no) +
        (formData.access_reviewed === "Yes" ? yes : no) +
        (formData.breach_training === "Yes" ? yes : no) +
        (formData.incident_response === "Yes" ? yes : no)) /
        5) *
        100,
    );

    frameworks["GDPR"] = Math.round(
      (((formData.gdpr_support === "Yes" ? yes : no) +
        (formData.retention_policy === "Yes" ? yes : no) +
        (formData.encryption === "Yes" ? yes : no) +
        (formData.access_reviewed === "Yes" ? yes : no)) /
        4) *
        100,
    );

    return frameworks;
  };

  const calculateScore = () => {
    const yes = 2,
      partial = 1,
      no = 0;
    const weights = {
      governance: 1.0,
      access: 2.0,
      privacy: 1.5,
      ai: 1.2,
      audit: 1.3,
      incident: 1.5,
      certs: 0.8,
    };

    let total = 0,
      max = 0;

    function add(value: number, weight: number) {
      total += value * weight;
      max += 2 * weight;
    }

    add(formData.security_policy === "Yes" ? yes : no, weights.governance);
    add(formData.roles_assigned === "Yes" ? yes : no, weights.governance);
    add(formData.asset_inventory === "Yes" ? yes : no, weights.governance);
    add(formData.data_classification === "Yes" ? yes : no, weights.governance);

    add(formData.sso_enabled === "Yes" ? yes : no, weights.access);
    add(formData.mfa_required === "Yes" ? yes : no, weights.access);
    add(
      formData.least_privilege === "Always"
        ? yes
        : formData.least_privilege === "Sometimes"
          ? partial
          : no,
      weights.access,
    );
    add(formData.access_reviewed === "Yes" ? yes : no, weights.access);

    add(
      formData.encryption === "Yes"
        ? yes
        : formData.encryption === "Partially"
          ? partial
          : no,
      weights.privacy,
    );
    add(formData.gdpr_support === "Yes" ? yes : no, weights.privacy);
    add(
      formData.phi_pii_secured === "Yes"
        ? yes
        : formData.phi_pii_secured === "In progress"
          ? partial
          : no,
      weights.privacy,
    );
    add(formData.retention_policy === "Yes" ? yes : no, weights.privacy);

    add(formData.ai_bias_reviewed === "Yes" ? yes : no, weights.ai);
    add(formData.ai_governance === "Yes" ? yes : no, weights.ai);
    add(formData.model_logging === "Yes" ? yes : no, weights.ai);
    add(
      formData.output_review === "Regularly"
        ? yes
        : formData.output_review === "Occasionally"
          ? partial
          : no,
      weights.ai,
    );

    add(formData.security_logs === "Yes" ? yes : no, weights.audit);
    add(formData.tamper_proof === "Yes" ? yes : no, weights.audit);
    add(formData.change_management === "Yes" ? yes : no, weights.audit);
    add(formData.vendor_assessment === "Yes" ? yes : no, weights.audit);

    add(formData.incident_response === "Yes" ? yes : no, weights.incident);
    add(formData.breach_training === "Yes" ? yes : no, weights.incident);
    add(formData.backup_testing === "Yes" ? yes : no, weights.incident);

    add(formData.certifications.length > 0 ? yes : no, weights.certs);

    const score = Math.round((total / max) * 100);
    return score;
  };

  const handleNextSection = () => {
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const score = calculateScore();
    const submissionData = {
      ...formData,
      score,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(SEND_EMAIL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const complianceScores = calculateComplianceScores();
        const complianceResult: ComplianceResult = {
          score,
          complianceScores,
          company: formData.company_name,
          timestamp: new Date().toISOString(),
        };
        setResult(complianceResult);
        setShowResults(true);
      } else {
        let errorMessage = "Unknown error";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status}`;
        }
        alert(`Failed to submit assessment: ${errorMessage}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        "An error occurred. Please check your internet connection and try again.",
      );
      setIsSubmitting(false);
    }
  };

  if (showResults && result) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
            <a
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/logo.svg"
                alt="Secure Automations"
                className="h-8 w-8"
              />
              <span className="font-semibold tracking-tight">
                Secure Automations
              </span>
            </a>
            <a
              href="/"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              ✕ Close
            </a>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="rounded-3xl border border-cyan-300/30 bg-slate-900/80 p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-block mb-6 p-3 rounded-full bg-cyan-300/20 border border-cyan-300/50">
                <svg
                  className="w-8 h-8 text-cyan-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Your AI Security Readiness Report
              </h1>
              <p className="text-slate-300">
                Based on your assessment, here's your overall compliance
                readiness
              </p>
            </div>

            <div className="mb-12">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-cyan-300 mb-2">
                  {result.score}%
                </div>
                <p className="text-slate-300">Overall Security Readiness Score</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {Object.entries(result.complianceScores).map(([framework, score]) => (
                  <div
                    key={framework}
                    className="rounded-xl bg-slate-950/40 border border-white/10 p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-300">
                        {framework}
                      </span>
                      <span className="text-lg font-bold text-cyan-300">
                        {score}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-2">
                      <div
                        className="bg-cyan-300 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950/40 p-6 border border-white/10 mb-8">
              <h3 className="font-semibold text-cyan-300 mb-4">
                Next Steps
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-3">
                  <ChevronRight className="h-5 w-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold text-white">Consultation</span> – Our specialist will contact you within 2 hours
                  </span>
                </li>
                <li className="flex gap-3">
                  <ChevronRight className="h-5 w-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold text-white">Detailed Analysis</span> – Review your strengths and gaps
                  </span>
                </li>
                <li className="flex gap-3">
                  <ChevronRight className="h-5 w-5 text-cyan-300 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold text-white">Custom Roadmap</span> – Get a tailored compliance plan
                  </span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-400 mb-6">
                Your detailed report has been sent to{" "}
                <span className="font-semibold text-slate-300">
                  {formData.work_email}
                </span>
                . Our compliance team will review your assessment and reach out
                shortly.
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-950 px-6 py-3 text-sm font-medium hover:bg-slate-100 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderSectionContent = () => {
    const sectionNum = currentSectionData.id;

    switch (sectionNum) {
      case 1:
        return (
          <div className="space-y-4">
            <TextField
              label="Company Name"
              placeholder="Enter your company name"
              value={formData.company_name ?? ""}
              onChange={(val) => handleChangeCallback("company_name", val)}
              required
            />
            <TextField
              label="Primary Contact Name"
              placeholder="Your full name"
              value={formData.contact_name ?? ""}
              onChange={(val) => handleChangeCallback("contact_name", val)}
              required
            />
            <TextField
              label="Contact Title"
              placeholder="Your title/role"
              value={formData.contact_title ?? ""}
              onChange={(val) => handleChangeCallback("contact_title", val)}
              required
            />
            <TextField
              label="Work Email"
              placeholder="your@company.com"
              value={formData.work_email ?? ""}
              onChange={(val) => handleChangeCallback("work_email", val)}
              required
            />
            <SelectField
              label="Industry"
              options={[
                "Healthcare",
                "Finance",
                "Technology",
                "Government Contractor",
                "Other",
              ]}
              value={formData.industry ?? ""}
              onChange={(val) => handleChangeCallback("industry", val)}
            />
            <SelectField
              label="Company Size"
              options={["1–50", "51–250", "251–1000", "1000+"]}
              value={formData.company_size ?? ""}
              onChange={(val) => handleChangeCallback("company_size", val)}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <SelectField
              label="Do you have an information security policy?"
              options={["Yes", "In progress", "No"]}
              value={formData.security_policy ?? ""}
              onChange={(val) =>
                handleChangeCallback("security_policy", val)
              }
            />
            <SelectField
              label="Have roles been assigned for data protection & AI governance?"
              options={["Yes", "No"]}
              value={formData.roles_assigned ?? ""}
              onChange={(val) =>
                handleChangeCallback("roles_assigned", val)
              }
            />
            <SelectField
              label="Do you maintain an asset inventory?"
              options={["Yes", "No"]}
              value={formData.asset_inventory ?? ""}
              onChange={(val) =>
                handleChangeCallback("asset_inventory", val)
              }
            />
            <SelectField
              label="Do you classify data (e.g., public, internal, confidential)?"
              options={["Yes", "No"]}
              value={formData.data_classification ?? ""}
              onChange={(val) =>
                handleChangeCallback("data_classification", val)
              }
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <SelectField
              label="Is single sign-on (SSO) enabled?"
              options={["Yes", "In progress", "No"]}
              value={formData.sso_enabled ?? ""}
              onChange={(val) =>
                handleChangeCallback("sso_enabled", val)
              }
            />
            <SelectField
              label="Is multi-factor authentication (MFA) required?"
              options={["Yes", "For sensitive systems", "No"]}
              value={formData.mfa_required ?? ""}
              onChange={(val) =>
                handleChangeCallback("mfa_required", val)
              }
            />
            <SelectField
              label="Is least privilege enforced?"
              options={["Always", "Sometimes", "No"]}
              value={formData.least_privilege ?? ""}
              onChange={(val) =>
                handleChangeCallback("least_privilege", val)
              }
            />
            <SelectField
              label="Are access rights reviewed regularly?"
              options={["Yes (quarterly or more)", "Yes (annually)", "No"]}
              value={formData.access_reviewed ?? ""}
              onChange={(val) =>
                handleChangeCallback("access_reviewed", val)
              }
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <SelectField
              label="Is data encrypted at rest and in transit?"
              options={["Yes", "Partially", "No"]}
              value={formData.encryption ?? ""}
              onChange={(val) =>
                handleChangeCallback("encryption", val)
              }
            />
            <SelectField
              label="Do you have GDPR-compliant data handling?"
              options={["Yes", "In progress", "No"]}
              value={formData.gdpr_support ?? ""}
              onChange={(val) =>
                handleChangeCallback("gdpr_support", val)
              }
            />
            <SelectField
              label="Are PHI/PII data secured?"
              options={["Yes", "In progress", "No"]}
              value={formData.phi_pii_secured ?? ""}
              onChange={(val) =>
                handleChangeCallback("phi_pii_secured", val)
              }
            />
            <SelectField
              label="Do you have data retention policies?"
              options={["Yes", "In progress", "No"]}
              value={formData.retention_policy ?? ""}
              onChange={(val) =>
                handleChangeCallback("retention_policy", val)
              }
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <SelectField
              label="Are AI models reviewed for bias?"
              options={["Yes", "Planned", "No"]}
              value={formData.ai_bias_reviewed ?? ""}
              onChange={(val) =>
                handleChangeCallback("ai_bias_reviewed", val)
              }
            />
            <SelectField
              label="Is there an AI governance committee?"
              options={["Yes", "Planned", "No"]}
              value={formData.ai_governance ?? ""}
              onChange={(val) =>
                handleChangeCallback("ai_governance", val)
              }
            />
            <SelectField
              label="Are model outputs logged?"
              options={["Yes", "Partial", "No"]}
              value={formData.model_logging ?? ""}
              onChange={(val) =>
                handleChangeCallback("model_logging", val)
              }
            />
            <SelectField
              label="Are AI outputs reviewed for accuracy?"
              options={["Regularly", "Occasionally", "Not yet"]}
              value={formData.output_review ?? ""}
              onChange={(val) =>
                handleChangeCallback("output_review", val)
              }
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <SelectField
              label="Are security logs monitored and retained?"
              options={["Yes", "Partial", "No"]}
              value={formData.security_logs ?? ""}
              onChange={(val) =>
                handleChangeCallback("security_logs", val)
              }
            />
            <SelectField
              label="Are logs tamper-proof?"
              options={["Yes", "No"]}
              value={formData.tamper_proof ?? ""}
              onChange={(val) =>
                handleChangeCallback("tamper_proof", val)
              }
            />
            <SelectField
              label="Is change management documented?"
              options={["Yes", "No"]}
              value={formData.change_management ?? ""}
              onChange={(val) =>
                handleChangeCallback("change_management", val)
              }
            />
            <SelectField
              label="Are vendors/third parties assessed?"
              options={["Yes", "Partial", "No"]}
              value={formData.vendor_assessment ?? ""}
              onChange={(val) =>
                handleChangeCallback("vendor_assessment", val)
              }
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <SelectField
              label="Do you have an incident response plan?"
              options={["Yes", "In progress", "No"]}
              value={formData.incident_response ?? ""}
              onChange={(val) =>
                handleChangeCallback("incident_response", val)
              }
            />
            <SelectField
              label="Is breach/incident training conducted?"
              options={["Yes (annually)", "Occasionally", "No"]}
              value={formData.breach_training ?? ""}
              onChange={(val) =>
                handleChangeCallback("breach_training", val)
              }
            />
            <SelectField
              label="Are backups tested regularly?"
              options={["Yes", "Occasionally", "No"]}
              value={formData.backup_testing ?? ""}
              onChange={(val) =>
                handleChangeCallback("backup_testing", val)
              }
            />
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300">
                Current alignments (check all that apply)
              </label>
              {[
                "SOC 2",
                "ISO 27001",
                "HIPAA",
                "GDPR",
                "NIST 800-53",
                "None",
              ].map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={cert}
                    checked={formData.certifications.includes(cert)}
                    onChange={() => handleCertificationChange(cert)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900/60 text-cyan-300 cursor-pointer"
                  />
                  <label
                    htmlFor={cert}
                    className="text-sm text-slate-300 cursor-pointer"
                  >
                    {cert}
                  </label>
                </div>
              ))}
            </div>

            <SelectField
              label="Target audit timeline"
              options={[
                "0–3 months",
                "3–6 months",
                "6–12 months",
                "More than 12 months",
              ]}
              value={formData.audit_timeline ?? ""}
              onChange={(val) =>
                handleChangeCallback("audit_timeline", val)
              }
            />

            <SelectField
              label="Request your free AI Security Readiness Report?"
              options={["Yes", "No"]}
              value={formData.request_report ?? ""}
              onChange={(val) =>
                handleChangeCallback("request_report", val)
              }
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Additional notes
              </label>
              <textarea
                value={formData.additional_notes ?? ""}
                onChange={(e) =>
                  handleChangeCallback("additional_notes", e.target.value)
                }
                placeholder="Tell us anything else we should know..."
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo.svg"
              alt="Secure Automations"
              className="h-8 w-8"
            />
            <span className="font-semibold tracking-tight">
              Secure Automations
            </span>
          </a>
          <a
            href="/"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            ✕ Close
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              AI Security Checkup
            </h1>
            <span className="text-sm text-slate-400">
              {currentSection + 1} / {SECTIONS.length}
            </span>
          </div>
          <div className="w-full bg-slate-800/50 rounded-full h-2">
            <div
              className="bg-cyan-300 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-white">
              {currentSectionData.title}
            </h2>
            <p className="text-slate-400">{currentSectionData.description}</p>
          </div>

          <div className="mb-8">{renderSectionContent()}</div>

          <div className="flex gap-4 pt-8 border-t border-white/10">
            {currentSection > 0 && (
              <button
                onClick={handlePreviousSection}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                ← Back
              </button>
            )}
            <div className="flex-1" />
            <button
              onClick={handleNextSection}
              disabled={isSubmitting}
              className="rounded-2xl bg-white text-slate-950 px-6 py-3 font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Submitting..."
                : currentSection === SECTIONS.length - 1
                  ? "Submit Assessment"
                  : "Next →"}
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-6 text-center">
            Responses are encrypted in transit and stored securely. Secure
            Automations never shares or resells data.
          </p>
        </div>
      </div>
    </div>
  );
}
