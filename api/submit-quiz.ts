import { VercelRequest, VercelResponse } from "@vercel/node";

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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = req.body as QuizSubmissionRequest;

    if (
      !formData.name ||
      !formData.email ||
      !formData.company ||
      !formData.recommendations ||
      formData.recommendations.length === 0
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!isValidEmail(formData.email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    formData.name = sanitizeInput(formData.name, 200);
    formData.email = formData.email.toLowerCase().trim();
    formData.company = sanitizeInput(formData.company, 200);

    const accessToken = await getAccessToken();

    const subject = `Automation Readiness Assessment – ${formData.company}`;
    const bodyHtml = formatQuizResultsAsHtml(formData);

    await sendEmailViaGraph(accessToken, formData.email, subject, bodyHtml);

    await sendEmailViaGraph(
      accessToken,
      "sales@secureautomations.ai",
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
