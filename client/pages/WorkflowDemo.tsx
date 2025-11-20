import React, { useState, useMemo } from "react";
import { Play, Check, AlertCircle } from "lucide-react";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "processing" | "complete" | "error";
  logs: string[];
}

interface WorkflowConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  formFields: Array<{
    name: string;
    label: string;
    placeholder: string;
    type: "text" | "textarea" | "email";
  }>;
  steps: Array<{
    title: string;
    description: string;
  }>;
  generateLogs: (formData: Record<string, string>) => string[];
}

const WORKFLOW_CONFIGS: Record<string, WorkflowConfig> = {
  support: {
    id: "support",
    title: "Customer Support Automation",
    description:
      "Classify incoming support tickets, draft responses, and route to the right team. Redact PII before logging.",
    icon: "📋",
    formFields: [
      {
        name: "email",
        label: "Customer Email",
        placeholder: "customer@example.com",
        type: "email",
      },
      {
        name: "subject",
        label: "Ticket Subject",
        placeholder: "Issue or question...",
        type: "text",
      },
      {
        name: "description",
        label: "Ticket Description",
        placeholder: "Describe the issue in detail...",
        type: "textarea",
      },
    ],
    steps: [
      { title: "Receive Ticket", description: "Incoming ticket captured" },
      {
        title: "Classify & Analyze",
        description: "NLP analysis determines ticket category",
      },
      {
        title: "Draft Response",
        description: "AI generates contextual response",
      },
      {
        title: "Redact PII",
        description: "Remove sensitive data before logging",
      },
      { title: "Route to Team", description: "Send to appropriate department" },
      {
        title: "Log & Archive",
        description: "Store in audit-compliant system",
      },
    ],
    generateLogs: (formData) => [
      `[14:23:45] Received ticket from ${formData.email}`,
      `[14:23:46] Subject: "${formData.subject}"`,
      `[14:23:47] Running NLP classification...`,
      `[14:23:48] Detected category: Technical Support (confidence: 94%)`,
      `[14:23:49] Analyzing sentiment: Neutral`,
      `[14:23:50] Generating response using knowledge base...`,
      `[14:23:52] Response generated (245 words)`,
      `[14:23:53] Scanning for PII: Found 1 email, 1 phone number`,
      `[14:23:54] PII redacted successfully`,
      `[14:23:55] Routing to: Technical Support Team (agent: Sarah)`,
      `[14:23:56] Created ticket #45829`,
      `[14:23:57] Stored in SOC 2 compliant audit log`,
      `[14:23:58] Notification sent to support team`,
      `[14:23:59] ✓ Process complete (2.14 seconds)`,
    ],
  },
  contract: {
    id: "contract",
    title: "Contract & Document Review",
    description:
      "Extract key terms, identify risks, and generate summaries from contracts and agreements. All with data protection built in.",
    icon: "📄",
    formFields: [
      {
        name: "documentName",
        label: "Document Name",
        placeholder: "e.g., Service Agreement Q4 2024",
        type: "text",
      },
      {
        name: "vendor",
        label: "Vendor/Party Name",
        placeholder: "Vendor name...",
        type: "text",
      },
      {
        name: "documentContent",
        label: "Document Content",
        placeholder: "Paste contract text here...",
        type: "textarea",
      },
    ],
    steps: [
      { title: "Upload Document", description: "Document received" },
      {
        title: "Extract Terms",
        description: "Parse contract structure and clauses",
      },
      {
        title: "Identify Risks",
        description: "Flag unfavorable or unusual terms",
      },
      {
        title: "Key Terms Summary",
        description: "Generate executive summary",
      },
      {
        title: "Encrypt & Store",
        description: "Secure storage with HIPAA compliance",
      },
    ],
    generateLogs: (formData) => [
      `[09:15:22] Document received: "${formData.documentName}"`,
      `[09:15:23] Vendor: ${formData.vendor}`,
      `[09:15:24] File size: 1.2 MB | Type: Text`,
      `[09:15:25] Running OCR and text parsing...`,
      `[09:15:27] Extracted 48 clauses and 23 exhibits`,
      `[09:15:28] Identifying key terms: Payment, Liability, Term, Termination`,
      `[09:15:31] Risk analysis in progress...`,
      `[09:15:33] ⚠ Risk identified: Unlimited liability clause (Line 156)`,
      `[09:15:34] ⚠ Risk identified: Non-standard renewal terms (Line 203)`,
      `[09:15:35] Generating executive summary...`,
      `[09:15:37] Summary created (412 words)`,
      `[09:15:38] Encrypting document with AES-256...`,
      `[09:15:39] Storing in HIPAA-compliant vault`,
      `[09:15:40] ✓ Review complete (18.5 seconds)`,
    ],
  },
  compliance: {
    id: "compliance",
    title: "Compliance Reporting Automation",
    description:
      "Generate SOC 2, NIST 800-53, and audit reports automatically from your systems. Real-time compliance dashboards.",
    icon: "✓",
    formFields: [
      {
        name: "framework",
        label: "Compliance Framework",
        placeholder: "e.g., SOC 2 Type II",
        type: "text",
      },
      {
        name: "period",
        label: "Reporting Period",
        placeholder: "e.g., Q4 2024",
        type: "text",
      },
      {
        name: "department",
        label: "Department",
        placeholder: "e.g., Security, Infrastructure",
        type: "text",
      },
    ],
    steps: [
      { title: "Trigger Report", description: "Generate request submitted" },
      {
        title: "Collect Evidence",
        description: "Pull data from all connected systems",
      },
      {
        title: "Analyze Compliance",
        description: "Check against framework requirements",
      },
      {
        title: "Generate Report",
        description: "Create compliance documentation",
      },
      {
        title: "Create Dashboard",
        description: "Real-time compliance visualization",
      },
    ],
    generateLogs: (formData) => [
      `[16:45:10] Report generation started`,
      `[16:45:11] Framework: ${formData.framework}`,
      `[16:45:12] Period: ${formData.period} | Department: ${formData.department}`,
      `[16:45:13] Connecting to data sources...`,
      `[16:45:14] ✓ Connected to AWS (245 resources)`,
      `[16:45:15] ✓ Connected to Okta (1,847 identities)`,
      `[16:45:16] ✓ Connected to Security Hub (892 findings)`,
      `[16:45:17] Collecting access logs (2.3 GB)...`,
      `[16:45:19] Analyzing 45,821 audit events...`,
      `[16:45:22] Checking 127 control requirements...`,
      `[16:45:25] ✓ 118 controls passing (92.9%)`,
      `[16:45:26] ⚠ 9 controls require attention`,
      `[16:45:27] Generating 47-page report...`,
      `[16:45:30] Creating interactive dashboard...`,
      `[16:45:31] ✓ Report complete (21.4 seconds)`,
    ],
  },
  iam: {
    id: "iam",
    title: "Identity & Access Management Sync",
    description:
      "Keep user access in sync across systems. Enforce least-privilege, manage role changes, and track access reviews.",
    icon: "👥",
    formFields: [
      {
        name: "employeeName",
        label: "Employee Name",
        placeholder: "John Smith",
        type: "text",
      },
      {
        name: "action",
        label: "Action Type",
        placeholder: "e.g., Onboarding, Role Change, Offboarding",
        type: "text",
      },
      {
        name: "department",
        label: "Department",
        placeholder: "e.g., Engineering, Sales, Finance",
        type: "text",
      },
    ],
    steps: [
      { title: "Receive Request", description: "HR/Admin request submitted" },
      {
        title: "Validate Permissions",
        description: "Check manager approval and compliance rules",
      },
      {
        title: "Sync to Systems",
        description: "Update across Entra ID, Okta, Active Directory",
      },
      {
        title: "Enforce Least-Privilege",
        description: "Remove unnecessary permissions",
      },
      {
        title: "Audit & Log",
        description: "Create compliance audit trail",
      },
    ],
    generateLogs: (formData) => [
      `[11:30:45] IAM sync request for: ${formData.employeeName}`,
      `[11:30:46] Action: ${formData.action}`,
      `[11:30:47] Department: ${formData.department}`,
      `[11:30:48] Validating against org policies...`,
      `[11:30:49] ✓ Manager approval found`,
      `[11:30:50] ✓ Compliance rules satisfied`,
      `[11:30:51] Starting sync to systems...`,
      `[11:30:52] → Syncing to Entra ID...`,
      `[11:30:53] ✓ Updated user profile in Entra ID`,
      `[11:30:54] → Syncing to Okta...`,
      `[11:30:55] ✓ Updated group memberships in Okta`,
      `[11:30:56] → Syncing to Active Directory...`,
      `[11:30:57] ✓ Updated local machine policies`,
      `[11:30:58] Enforcing least-privilege access...`,
      `[11:30:59] Removed 3 legacy permissions`,
      `[11:31:00] Created audit log entry #78924`,
      `[11:31:01] ✓ Sync complete (16.2 seconds)`,
    ],
  },
};

interface WorkflowDemoProps {
  workflowId?: string;
}

export default function WorkflowDemoPage({
  workflowId = "support",
}: WorkflowDemoProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [allLogs, setAllLogs] = useState<string[]>([]);

  const workflow = useMemo(
    () => WORKFLOW_CONFIGS[workflowId] || WORKFLOW_CONFIGS.support,
    [workflowId]
  );

  const steps: WorkflowStep[] = workflow.steps.map((step, idx) => {
    let status: "pending" | "processing" | "complete" | "error" = "pending";
    if (idx < currentStepIndex) status = "complete";
    if (idx === currentStepIndex && isRunning) status = "processing";
    if (idx === currentStepIndex && !isRunning && currentStepIndex !== -1)
      status = "complete";

    const relevantLogs = allLogs.filter((log, i) => {
      const logsPerStep = Math.ceil(allLogs.length / workflow.steps.length);
      return i >= idx * logsPerStep && i < (idx + 1) * logsPerStep;
    });

    return {
      id: step.title,
      title: step.title,
      description: step.description,
      status,
      logs: relevantLogs,
    };
  });

  const handleRunWorkflow = () => {
    setIsRunning(true);
    setCurrentStepIndex(0);
    setAllLogs([]);

    const logs = workflow.generateLogs(formData);
    setAllLogs(logs);

    const logsPerStep = Math.ceil(logs.length / workflow.steps.length);
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= workflow.steps.length) {
        setIsRunning(false);
        setCurrentStepIndex(workflow.steps.length - 1);
        clearInterval(interval);
      } else {
        setCurrentStepIndex(currentStep);
      }
    }, 1000);
  };

  const handleReset = () => {
    setFormData({});
    setIsRunning(false);
    setCurrentStepIndex(-1);
    setAllLogs([]);
  };

  const isFormValid = workflow.formFields.every((field) => formData[field.name]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <a
            href="/examples"
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
            href="/examples"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Back to Examples
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-2xl mr-2">{workflow.icon}</span>
            {workflow.title}
          </h1>
          <p className="text-slate-300 max-w-2xl">{workflow.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form Input */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Input</h2>
              <div className="space-y-4">
                {workflow.formFields.map((field) => (
                  <div key={field.name}>
                    <label className="text-sm font-medium text-slate-300 block mb-2">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.name]: e.target.value,
                          })
                        }
                        placeholder={field.placeholder}
                        disabled={isRunning}
                        rows={4}
                        className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:opacity-50"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.name]: e.target.value,
                          })
                        }
                        placeholder={field.placeholder}
                        disabled={isRunning}
                        className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:opacity-50"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleRunWorkflow}
                  disabled={!isFormValid || isRunning}
                  className="flex-1 rounded-xl bg-cyan-300 text-slate-950 px-4 py-2 font-semibold hover:bg-cyan-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Run
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm hover:bg-slate-900/80 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right: Workflow Steps + Logs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Steps */}
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`rounded-xl border p-4 transition-colors ${
                    step.status === "complete"
                      ? "border-green-500/50 bg-green-500/10"
                      : step.status === "processing"
                        ? "border-cyan-300/50 bg-cyan-300/10"
                        : "border-white/10 bg-slate-900/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {step.status === "complete" && (
                        <Check className="h-5 w-5 text-green-400" />
                      )}
                      {step.status === "processing" && (
                        <div className="h-5 w-5 rounded-full border-2 border-cyan-300 border-t-transparent animate-spin" />
                      )}
                      {step.status === "pending" && (
                        <div className="h-5 w-5 rounded-full border-2 border-slate-600" />
                      )}
                      {step.status === "error" && (
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-sm text-slate-400">{step.description}</p>
                    </div>
                  </div>

                  {step.logs.length > 0 && (
                    <div className="mt-3 ml-8 text-xs font-mono space-y-1 text-slate-400">
                      {step.logs.map((log, i) => (
                        <div key={i}>{log}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Full Logs */}
            {allLogs.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                <h3 className="font-semibold text-sm mb-3">Full Log Output</h3>
                <div className="bg-slate-950 rounded-lg p-3 max-h-[300px] overflow-y-auto font-mono text-xs text-slate-400 space-y-1">
                  {allLogs.map((log, idx) => (
                    <div key={idx}>{log}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-slate-900/40">
          <p className="text-sm text-slate-400">
            <strong>Demo Note:</strong> This interactive demonstration shows how
            our {workflow.title} works end-to-end. Fill in the form, click "Run",
            and watch the automation process your data through each step with
            real-time logs. In production, this would be connected to your actual
            systems and databases.
          </p>
        </div>
      </div>
    </div>
  );
}
