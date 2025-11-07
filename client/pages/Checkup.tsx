import React, { useState, useCallback, memo } from "react";
import { ChevronDown } from "lucide-react";

interface FormData {
  // Section 1
  company_name: string;
  contact_name: string;
  contact_title: string;
  work_email: string;
  industry: string;
  company_size: string;

  // Section 2
  security_policy: string;
  roles_assigned: string;
  asset_inventory: string;
  data_classification: string;

  // Section 3
  sso_enabled: string;
  mfa_required: string;
  least_privilege: string;
  access_reviewed: string;

  // Section 4
  encryption: string;
  gdpr_support: string;
  phi_pii_secured: string;
  retention_policy: string;

  // Section 5
  ai_bias_reviewed: string;
  ai_governance: string;
  model_logging: string;
  output_review: string;

  // Section 6
  security_logs: string;
  tamper_proof: string;
  change_management: string;
  vendor_assessment: string;

  // Section 7
  incident_response: string;
  breach_training: string;
  backup_testing: string;

  // Section 8
  certifications: string[];
  audit_timeline: string;
  request_report: string;
  additional_notes: string;
}

// API endpoint for sending assessment emails
const SEND_EMAIL_ENDPOINT = "/api/send-email";

export default function CheckupPage() {
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
  const [expandedSection, setExpandedSection] = useState<number>(1);

  // Memoize handleChange to prevent component recreations
  const handleChangeCallback = useCallback(
    (field: keyof FormData, value: string | string[]) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const SelectField = memo(({
    label,
    options,
    field,
    required = false,
  }: {
    label: string;
    options: string[];
    field: keyof FormData;
    required?: boolean;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <select
        required={required}
        value={(formData[field] as string) ?? ""}
        onChange={(e) => handleChangeCallback(field, e.target.value)}
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
  ));

  const TextField = memo(({
    label,
    placeholder,
    field,
    required = false,
  }: {
    label: string;
    placeholder: string;
    field: keyof FormData;
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
        value={(formData[field] as string) ?? ""}
        onChange={(e) => handleChangeCallback(field, e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
      />
    </div>
  ));

  const SectionHeader = memo(({ num, title, isExpanded, onToggle }: { num: number; title: string; isExpanded: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-colors"
    >
      <h3 className="text-lg font-semibold text-white">
        Section {num} – {title}
      </h3>
      <ChevronDown
        className={`w-5 h-5 text-slate-400 transition-transform ${
          isExpanded ? "rotate-180" : ""
        }`}
      />
    </button>
  ));

  const calculateComplianceScores = () => {
    // Calculate individual compliance framework scores
    const frameworks: Record<string, number> = {
      "NIST 800-53": 0,
      "SOC 2 (TSC)": 0,
      "ISO/IEC 27001": 0,
      "ISO/IEC 42001": 0,
      "HIPAA": 0,
      "GDPR": 0,
    };

    const yes = 1, no = 0;

    // NIST 800-53 (focuses on organizational controls, access, audit, incident response)
    frameworks["NIST 800-53"] = Math.round(
      ((formData.security_policy === "Yes" ? yes : no) +
        (formData.roles_assigned === "Yes" ? yes : no) +
        (formData.access_reviewed === "Yes" ? yes : no) +
        (formData.security_logs === "Yes" ? yes : no) +
        (formData.incident_response === "Yes" ? yes : no)) /
        5 * 100
    );

    // SOC 2 (focuses on security, availability, processing integrity, confidentiality, privacy)
    frameworks["SOC 2 (TSC)"] = Math.round(
      ((formData.security_policy === "Yes" ? yes : no) +
        (formData.mfa_required === "Yes" ? yes : no) +
        (formData.encryption === "Yes" ? yes : no) +
        (formData.security_logs === "Yes" ? yes : no) +
        (formData.breach_training === "Yes" ? yes : no)) /
        5 * 100
    );

    // ISO/IEC 27001 (focuses on information security management)
    frameworks["ISO/IEC 27001"] = Math.round(
      ((formData.security_policy === "Yes" ? yes : no) +
        (formData.asset_inventory === "Yes" ? yes : no) +
        (formData.access_reviewed === "Yes" ? yes : no) +
        (formData.least_privilege === "Yes" ? yes : no) +
        (formData.change_management === "Yes" ? yes : no)) /
        5 * 100
    );

    // ISO/IEC 42001 (focuses on AI governance)
    frameworks["ISO/IEC 42001"] = Math.round(
      ((formData.ai_governance === "Yes" ? yes : no) +
        (formData.ai_bias_reviewed === "Yes" ? yes : no) +
        (formData.model_logging === "Yes" ? yes : no) +
        (formData.output_review === "Yes" ? yes : no)) /
        4 * 100
    );

    // HIPAA (focuses on data protection and privacy for healthcare)
    frameworks["HIPAA"] = Math.round(
      ((formData.phi_pii_secured === "Yes" ? yes : no) +
        (formData.encryption === "Yes" ? yes : no) +
        (formData.access_reviewed === "Yes" ? yes : no) +
        (formData.breach_training === "Yes" ? yes : no) +
        (formData.incident_response === "Yes" ? yes : no)) /
        5 * 100
    );

    // GDPR (focuses on data protection and privacy)
    frameworks["GDPR"] = Math.round(
      ((formData.gdpr_support === "Yes" ? yes : no) +
        (formData.retention_policy === "Yes" ? yes : no) +
        (formData.encryption === "Yes" ? yes : no) +
        (formData.access_reviewed === "Yes" ? yes : no)) /
        4 * 100
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

    // Governance
    add(formData.security_policy === "Yes" ? yes : no, weights.governance);
    add(formData.roles_assigned === "Yes" ? yes : no, weights.governance);
    add(formData.asset_inventory === "Yes" ? yes : no, weights.governance);
    add(formData.data_classification === "Yes" ? yes : no, weights.governance);

    // Access Control
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

    // Privacy
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

    // AI Governance
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

    // Audit & Monitoring
    add(formData.security_logs === "Yes" ? yes : no, weights.audit);
    add(formData.tamper_proof === "Yes" ? yes : no, weights.audit);
    add(formData.change_management === "Yes" ? yes : no, weights.audit);
    add(formData.vendor_assessment === "Yes" ? yes : no, weights.audit);

    // Incident Response
    add(formData.incident_response === "Yes" ? yes : no, weights.incident);
    add(formData.breach_training === "Yes" ? yes : no, weights.incident);
    add(formData.backup_testing === "Yes" ? yes : no, weights.incident);

    // Certifications (simplified)
    add(formData.certifications.length > 0 ? yes : no, weights.certs);

    const score = Math.round((total / max) * 100);
    return score;
  };


  const handleCertificationChange = (cert: string) => {
    setFormData((prev) => {
      const certs = prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert];
      return { ...prev, certifications: certs };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        // Calculate and store compliance scores
        const complianceScores = calculateComplianceScores();
        sessionStorage.setItem(
          "complianceResults",
          JSON.stringify({
            score,
            complianceScores,
            company: formData.company_name,
            timestamp: new Date().toISOString(),
          })
        );
        window.location.href = "/thank-you";
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
            ✕ Close
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Secure Automations — AI Security Readiness Checkup
          </h1>
          <p className="mt-4 text-slate-300">
            Assess your organization's readiness across NIST 800-53, SOC 2,
            ISO/IEC 27001, ISO/IEC 42001, HIPAA and GDPR. You'll get a
            personalized AI Security Readiness Report sent to your email by our
            compliance team.
          </p>
          <p className="mt-3 text-sm text-slate-400">
            All responses are encrypted and reviewed only by Secure Automations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Section 1 */}
          <div className="space-y-4">
            <SectionHeader num={1} title="Organization Overview" isExpanded={expandedSection === 1} onToggle={() => setExpandedSection(expandedSection === 1 ? 0 : 1)} />
            {expandedSection === 1 && (
              <div className="border border-white/10 rounded-xl p-6 space-y-4">
                <TextField
                  label="Company Name"
                  placeholder="Enter your company name"
                  field="company_name"
                  required
                />
                <TextField
                  label="Primary Contact Name"
                  placeholder="Your full name"
                  field="contact_name"
                  required
                />
                <TextField
                  label="Contact Title"
                  placeholder="Your title/role"
                  field="contact_title"
                  required
                />
                <TextField
                  label="Work Email"
                  placeholder="your@company.com"
                  field="work_email"
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
                  field="industry"
                />
                <SelectField
                  label="Company Size"
                  options={["1–50", "51–250", "251–1000", "1000+"]}
                  field="company_size"
                />
              </div>
            )}
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <SectionHeader num={2} title="Governance & Policy" isExpanded={expandedSection === 2} onToggle={() => setExpandedSection(expandedSection === 2 ? 0 : 2)} />
            {expandedSection === 2 && (
              <div className="border border-white/10 rounded-xl p-6 space-y-4">
                <SelectField
                  label="Do you have an information security policy?"
                  options={["Yes", "In progress", "No"]}
                  field="security_policy"
                />
                <SelectField
                  label="Have roles been assigned for data protection & AI governance?"
                  options={["Yes", "No"]}
                  field="roles_assigned"
                />
                <SelectField
                  label="Do you maintain an asset inventory?"
                  options={["Yes", "No"]}
                  field="asset_inventory"
                />
                <SelectField
                  label="Do you classify data (e.g., public, internal, confidential)?"
                  options={["Yes", "No"]}
                  field="data_classification"
                />
              </div>
            )}
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <SectionHeader num={3} title="Access Control / Zero Trust" isExpanded={expandedSection === 3} onToggle={() => setExpandedSection(expandedSection === 3 ? 0 : 3)} />
            {expandedSection === 3 && (
              <div className="border border-white/10 rounded-xl p-6 space-y-4">
                <SelectField
                  label="Single Sign-On enabled?"
                  options={["Yes", "No"]}
                  field="sso_enabled"
                />
                <SelectField
                  label="MFA required for privileged accounts?"
                  options={["Yes", "No"]}
                  field="mfa_required"
                />
                <SelectField
                  label="Least-privilege access enforced?"
                  options={["Always", "Sometimes", "Never"]}
                  field="least_privilege"
                />
                <SelectField
                  label="Access rights reviewed quarterly?"
                  options={["Yes", "No"]}
                  field="access_reviewed"
                />
              </div>
            )}
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <SectionHeader num={4} title="Data Protection & Privacy" isExpanded={expandedSection === 4} onToggle={() => setExpandedSection(expandedSection === 4 ? 0 : 4)} />
            {expandedSection === 4 && (
              <div className="border border-white/10 rounded-xl p-6 space-y-4">
                <SelectField
                  label="Data encrypted at rest and in transit?"
                  options={["Yes", "Partially", "No"]}
                  field="encryption"
                />
                <SelectField
                  label="GDPR/CCPA data subject requests supported?"
                  options={["Yes", "No"]}
                  field="gdpr_support"
                />
                <SelectField
                  label="PHI/PII data flows documented and secured?"
                  options={["Yes", "In progress", "No"]}
                  field="phi_pii_secured"
                />
                <SelectField
                  label="Data retention and deletion policy exists?"
                  options={["Yes", "No"]}
                  field="retention_policy"
                />
              </div>
            )}
          </div>

          {/* Section 5 */}
          <div className="space-y-4">
            <SectionHeader num={5} title="AI Governance" isExpanded={expandedSection === 5} onToggle={() => setExpandedSection(expandedSection === 5 ? 0 : 5)} />
            {expandedSection === 5 && (
              <div className="border border-white/10 rounded-xl p-6 space-y-4">
                <SelectField
                  label="AI models reviewed for bias and fairness?"
                  options={["Yes", "No"]}
                  field="ai_bias_reviewed"
                />
                <SelectField
                  label="AI governance committee or review process exists?"
                  options={["Yes", "No"]}
                  field="ai_governance"
                />
                <SelectField
                  label="Model prompts and decisions logged?"
                  options={["Yes", "No"]}
                  field="model_logging"
                />
                <SelectField
                  label="Outputs reviewed for hallucinations or data leakage?"
                  options={["Regularly", "Occasionally", "Never"]}
                  field="output_review"
                />
              </div>
            )}
          </div>

          {/* Section 6 */}
          <div className="space-y-4">
            <SectionHeader num={6} title="Audit & Monitoring" expandedSection={expandedSection} setExpandedSection={setExpandedSection} />
            {expandedSection === 6 && (
              <div className="border border-white/10 rounded-xl p-6 space-y-4">
                <SelectField
                  label="Security logs collected and reviewed?"
                  options={["Yes", "No"]}
                  field="security_logs"
                />
                <SelectField
                  label="Audit logs tamper-proof?"
                  options={["Yes", "No"]}
                  field="tamper_proof"
                />
                <SelectField
                  label="Change management process for automations?"
                  options={["Yes", "No"]}
                  field="change_management"
                />
                <SelectField
                  label="Third-party vendors assessed for security?"
                  options={["Yes", "No"]}
                  field="vendor_assessment"
                />
              </div>
            )}
          </div>

          {/* Section 7 */}
          <div className="space-y-4">
            <SectionHeader num={7} title="Incident Response & Continuity" expandedSection={expandedSection} setExpandedSection={setExpandedSection} />
            {expandedSection === 7 && (
              <div className="border border-white/10 rounded-xl p-6 space-y-4">
                <SelectField
                  label="Incident response plan (including AI risks)?"
                  options={["Yes", "No"]}
                  field="incident_response"
                />
                <SelectField
                  label="Team trained on breach response?"
                  options={["Yes", "No"]}
                  field="breach_training"
                />
                <SelectField
                  label="Regular backups and recovery testing?"
                  options={["Yes", "No"]}
                  field="backup_testing"
                />
              </div>
            )}
          </div>

          {/* Section 8 */}
          <div className="space-y-4">
            <SectionHeader num={8} title="Certifications & Goals" expandedSection={expandedSection} setExpandedSection={setExpandedSection} />
            {expandedSection === 8 && (
              <div className="border border-white/10 rounded-xl p-6 space-y-4">
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
                  field="audit_timeline"
                />

                <SelectField
                  label="Request your free AI Security Readiness Report?"
                  options={["Yes", "No"]}
                  field="request_report"
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
            )}
          </div>

          {/* Privacy Note & Submit */}
          <div className="border border-white/10 rounded-xl p-6 bg-slate-900/40 space-y-4">
            <p className="text-xs text-slate-400">
              Responses are encrypted in transit and stored securely. Secure
              Automations never shares or resells data.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-white text-slate-950 px-5 py-3 text-sm font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Assessment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
