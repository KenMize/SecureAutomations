import { Request, Response } from "express";

// Helper function to escape HTML special characters
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

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Helper function to sanitize input
function sanitizeInput(input: string, maxLength: number = 5000): string {
  return escapeHtml(input.trim().substring(0, maxLength));
}

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

interface ContactFormRequest {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface RecommendedSolution {
  name: string;
  description: string;
  benefits: string[];
}

interface QuizSubmissionRequest {
  email: string;
  name: string;
  company: string;
  recommendations: RecommendedSolution[];
  details: Record<string, string | number | (string | number)[]>;
  timestamp: string;
}

// Get Microsoft Graph access token
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

// Send email via Microsoft Graph API
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

// Format form data as HTML
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

function formatContactFormAsHtml(data: ContactFormRequest): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          h1 { color: #0f172a; }
          h3 { color: #06b6d4; }
          p { margin: 5px 0; }
          .field { margin: 15px 0; }
          .field-label { font-weight: bold; color: #06b6d4; }
        </style>
      </head>
      <body>
        <h1>New Consultation Request</h1>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>

        <div class="field">
          <div class="field-label">Name:</div>
          <p>${escapeHtml(data.name)}</p>
        </div>

        <div class="field">
          <div class="field-label">Email:</div>
          <p>${escapeHtml(data.email)}</p>
        </div>

        <div class="field">
          <div class="field-label">Company:</div>
          <p>${escapeHtml(data.company)}</p>
        </div>

        <div class="field">
          <div class="field-label">Message:</div>
          <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
        </div>

        <hr style="margin-top: 30px;">
        <p style="color: #666; font-size: 12px;">This email was sent from the Secure Automations website contact form.</p>
      </body>
    </html>
  `;
}

export async function handleSendEmail(req: Request, res: Response) {
  try {
    const formData = req.body as SendEmailRequest;

    // Validate required fields
    if (!formData.company_name || !formData.work_email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate email format
    if (!isValidEmail(formData.work_email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Sanitize string inputs
    formData.company_name = sanitizeInput(formData.company_name, 200);
    formData.contact_name = sanitizeInput(formData.contact_name, 200);
    formData.work_email = formData.work_email.toLowerCase().trim();
    formData.industry = sanitizeInput(formData.industry, 100);
    formData.company_size = sanitizeInput(formData.company_size, 100);
    formData.additional_notes = sanitizeInput(formData.additional_notes, 5000);

    // Get access token from Azure
    const accessToken = await getAccessToken();

    // Format the email
    const subject = `New AI Security Checkup – ${formData.company_name} (${formData.score}%)`;
    const bodyHtml = formatFormDataAsHtml(formData);

    // Send email
    await sendEmailViaGraph(
      accessToken,
      "Security@secureautomations.ai",
      subject,
      bodyHtml,
    );

    return res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to send email",
    });
  }
}

export async function handleContactForm(req: Request, res: Response) {
  try {
    const formData = req.body as ContactFormRequest;

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.company ||
      !formData.message
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Sanitize string inputs
    formData.name = sanitizeInput(formData.name, 200);
    formData.email = formData.email.toLowerCase().trim();
    formData.company = sanitizeInput(formData.company, 200);
    formData.message = sanitizeInput(formData.message, 5000);

    // Get access token from Azure
    const accessToken = await getAccessToken();

    // Format the email
    const subject = `New Strategy Call Request – ${formData.company}`;
    const bodyHtml = formatContactFormAsHtml(formData);

    // Send email to sales team
    await sendEmailViaGraph(
      accessToken,
      "sales@secureautomations.ai",
      subject,
      bodyHtml,
    );

    return res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to send email",
    });
  }
}

function formatQuizResultsAsHtml(data: QuizSubmissionRequest): string {
  const recommendationsHtml = data.recommendations
    .map(
      (rec, idx) =>
        `<div style="background: #f9fafb; border-left: 4px solid #06b6d4; padding: 15px; margin: 15px 0; border-radius: 3px;">
          <h4 style="color: #0f172a; margin-top: 0; margin-bottom: 5px;">${idx + 1}. ${escapeHtml(rec.name)}</h4>
          <p style="color: #666; margin: 8px 0; font-size: 14px;">${escapeHtml(rec.description)}</p>
          <p style="color: #06b6d4; font-weight: bold; margin: 10px 0 5px 0; font-size: 12px;">Key Benefits:</p>
          <ul style="margin: 5px 0; padding-left: 20px; font-size: 13px; color: #666;">
            ${rec.benefits.map((benefit) => `<li style="margin: 4px 0;">${escapeHtml(benefit)}</li>`).join("")}
          </ul>
        </div>`,
    )
    .join("");

  const formatDetailValue = (value: unknown): string => {
    if (Array.isArray(value)) {
      const sanitizedEntries = value
        .map((entry) =>
          entry === null || entry === undefined ? "" : String(entry).trim(),
        )
        .filter((entry) => entry.length > 0)
        .map((entry) => escapeHtml(entry));
      return sanitizedEntries.join(", ") || "Not provided";
    }

    if (value === undefined || value === null) {
      return "Not provided";
    }

    const stringValue = String(value).trim();
    if (stringValue.length === 0) {
      return "Not provided";
    }

    return escapeHtml(stringValue);
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
          h1 { color: #0f172a; margin-bottom: 10px; }
          h2 { color: #0f172a; margin-top: 25px; margin-bottom: 15px; font-size: 18px; }
          h3 { color: #06b6d4; }
          h4 { color: #0f172a; }
          p { margin: 8px 0; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          td { padding: 10px 12px; border: 1px solid #e5e7eb; }
          .assessment-box { background: #f0f9fc; border-left: 4px solid #06b6d4; padding: 15px; margin: 20px 0; border-radius: 3px; }
          .next-steps { background: #f9fafb; padding: 15px; margin: 20px 0; border-radius: 3px; }
          .footer { color: #999; font-size: 11px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <h1>Your Personalized Automation Plan</h1>
        <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
        <p><strong>Contact Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Contact Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Assessment Date:</strong> ${new Date(data.timestamp).toLocaleString()}</p>

        <h2>Recommended Solutions</h2>
        <p>Based on your assessment responses, we recommend the following solutions to address your automation needs:</p>

        ${recommendationsHtml}

        <h2>Your Assessment Details</h2>
        <table>
          <tr>
            <td style="font-weight: bold; background: #f3f4f6;"><strong>Primary Needs</strong></td>
            <td>${formatDetailValue(data.details["pain-points"])}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #f3f4f6;"><strong>Primary Goals</strong></td>
            <td>${formatDetailValue(data.details["primary-goal"])}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #f3f4f6;"><strong>Task Frequency</strong></td>
            <td>${formatDetailValue(data.details["task-frequency"])}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #f3f4f6;"><strong>Complexity Level</strong></td>
            <td>${formatDetailValue(data.details["complexity-level"])}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #f3f4f6;"><strong>Volume</strong></td>
            <td>${formatDetailValue(data.details["volume-scale"])}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #f3f4f6;"><strong>Systems Integration</strong></td>
            <td>${formatDetailValue(data.details["systems-integration"])}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background: #f3f4f6;"><strong>Timeline</strong></td>
            <td>${formatDetailValue(data.details["timeline"])}</td>
          </tr>
        </table>

        <div class="next-steps">
          <h3 style="margin-top: 0; color: #0f172a;">What Happens Next</h3>
          <ol style="padding-left: 20px;">
            <li><strong>Consultation (2 hours)</strong> – Our specialist will contact you to discuss your needs</li>
            <li><strong>Deep Dive Analysis</strong> – We'll review your workflows in detail</li>
            <li><strong>Custom Proposal</strong> – You'll receive a tailored implementation roadmap</li>
            <li><strong>Proof of Concept</strong> – Start with a focused pilot project</li>
          </ol>
        </div>

        <div class="footer">
          <p>This assessment was completed via the Secure Automations Automation Readiness Quiz. Our Sales team will review your results and contact you shortly to discuss next steps.</p>
          <p>Questions? Reply to this email or visit our website.</p>
        </div>
      </body>
    </html>
  `;
}

export async function handleQuizSubmission(req: Request, res: Response) {
  try {
    const formData = req.body as QuizSubmissionRequest;

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.company ||
      !formData.recommendations ||
      formData.recommendations.length === 0
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Sanitize string inputs
    formData.name = sanitizeInput(formData.name, 200);
    formData.email = formData.email.toLowerCase().trim();
    formData.company = sanitizeInput(formData.company, 200);

    // Get access token from Azure
    const accessToken = await getAccessToken();

    // Format the email
    const subject = `Automation Readiness Assessment – ${formData.company}`;
    const bodyHtml = formatQuizResultsAsHtml(formData);

    // Send to user's email
    await sendEmailViaGraph(accessToken, formData.email, subject, bodyHtml);

    // Send to sales team
    await sendEmailViaGraph(
      accessToken,
      "Sales@secureautomations.ai",
      subject,
      bodyHtml,
    );

    return res.json({
      success: true,
      message: "Quiz results sent successfully",
    });
  } catch (error) {
    console.error("Error sending quiz results:", error);
    return res.status(500).json({
      error:
        error instanceof Error ? error.message : "Failed to send quiz results",
    });
  }
}
