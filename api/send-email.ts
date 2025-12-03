import { VercelRequest, VercelResponse } from "@vercel/node";

interface SendEmailRequest {
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
  score: number;
  timestamp: string;
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function sanitizeInput(input: string, maxLength: number = 5000): string {
  return escapeHtml(input.trim().substring(0, maxLength));
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.AZURE_CLIENT_ID;
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!clientId || !tenantId || !clientSecret) {
    throw new Error("Missing Azure credentials in environment variables");
  }

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }).toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Token error:", error);
    throw new Error("Failed to get access token");
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

async function sendEmailViaGraph(
  accessToken: string,
  to: string,
  subject: string,
  bodyHtml: string,
): Promise<void> {
  const sharedMailbox = "noreply@secureautomations.ai";
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${sharedMailbox}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject,
          body: {
            contentType: "HTML",
            content: bodyHtml,
          },
          toRecipients: [
            {
              emailAddress: {
                address: to,
              },
            },
          ],
        },
        saveToSentItems: true,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Email send error:", error);
    throw new Error("Failed to send email");
  }
}

function formatFormDataAsHtml(data: SendEmailRequest): string {
  const sections = [
    {
      title: "Organization Overview",
      fields: {
        "Company Name": data.company_name,
        Contact: `${data.contact_name}, ${data.contact_title}`,
        "Work Email": data.work_email,
        Industry: data.industry,
        "Company Size": data.company_size,
      },
    },
    {
      title: "Governance & Policy",
      fields: {
        "Security Policy": data.security_policy,
        "Roles Assigned": data.roles_assigned,
        "Asset Inventory": data.asset_inventory,
        "Data Classification": data.data_classification,
      },
    },
    {
      title: "Access Control / Zero Trust",
      fields: {
        "SSO Enabled": data.sso_enabled,
        "MFA Required": data.mfa_required,
        "Least Privilege": data.least_privilege,
        "Access Reviewed": data.access_reviewed,
      },
    },
    {
      title: "Data Protection & Privacy",
      fields: {
        Encryption: data.encryption,
        "GDPR Support": data.gdpr_support,
        "PHI/PII Secured": data.phi_pii_secured,
        "Retention Policy": data.retention_policy,
      },
    },
    {
      title: "AI Governance",
      fields: {
        "Bias Reviewed": data.ai_bias_reviewed,
        "Governance Committee": data.ai_governance,
        "Model Logging": data.model_logging,
        "Output Review": data.output_review,
      },
    },
    {
      title: "Audit & Monitoring",
      fields: {
        "Security Logs": data.security_logs,
        "Tamper Proof": data.tamper_proof,
        "Change Management": data.change_management,
        "Vendor Assessment": data.vendor_assessment,
      },
    },
    {
      title: "Incident Response & Continuity",
      fields: {
        "Incident Response": data.incident_response,
        "Breach Training": data.breach_training,
        "Backup Testing": data.backup_testing,
      },
    },
    {
      title: "Certifications & Goals",
      fields: {
        Certifications: (data.certifications || []).join(", ") || "None",
        "Audit Timeline": data.audit_timeline,
        "Request Report": data.request_report,
        "Additional Notes": data.additional_notes,
      },
    },
  ];

  const sectionHtml = sections
    .map(
      (section) =>
        `<h3 style="color: #06b6d4; margin-top: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">${section.title}</h3>
         ${Object.entries(section.fields)
           .map(
             ([key, value]) =>
               `<p><strong>${key}:</strong> ${escapeHtml(value || "Not provided")}</p>`,
           )
           .join("")}`,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          h1 { color: #0f172a; }
          h3 { color: #06b6d4; }
          p { margin: 5px 0; }
          .score { background: #f0f0f0; padding: 15px; margin: 20px 0; border-radius: 5px; font-size: 18px; }
        </style>
      </head>
      <body>
        <h1>New AI Security Readiness Assessment</h1>
        <p><strong>Readiness Score:</strong> <span style="color: #06b6d4; font-size: 20px;">${data.score}%</span></p>
        <p><strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString()}</p>

        <div class="score">
          <h2 style="margin-top: 0;">Readiness Score: ${data.score}%</h2>
          <p>This assessment provides an overview of the organization's AI security posture across key compliance frameworks.</p>
        </div>

        ${sectionHtml}

        <hr style="margin-top: 30px;">
        <p style="color: #666; font-size: 12px;">This email was sent from the Secure Automations AI Security Readiness Checkup.</p>
      </body>
    </html>
  `;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const formData = req.body as SendEmailRequest;

    if (!formData.company_name || !formData.work_email) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    if (!isValidEmail(formData.work_email)) {
      res.status(400).json({ error: "Invalid email address" });
      return;
    }

    formData.company_name = sanitizeInput(formData.company_name, 200);
    formData.contact_name = sanitizeInput(formData.contact_name, 200);
    formData.work_email = formData.work_email.toLowerCase().trim();
    formData.industry = sanitizeInput(formData.industry, 100);
    formData.company_size = sanitizeInput(formData.company_size, 100);
    formData.additional_notes = sanitizeInput(formData.additional_notes, 5000);

    const accessToken = await getAccessToken();

    const subject = `New AI Security Checkup – ${formData.company_name} (${formData.score}%)`;
    const bodyHtml = formatFormDataAsHtml(formData);

    await sendEmailViaGraph(
      accessToken,
      "Security@secureautomations.ai",
      subject,
      bodyHtml,
    );

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to send email",
    });
  }
}
