import { VercelRequest, VercelResponse } from "@vercel/node";

interface ContactFormRequest {
  name: string;
  email: string;
  company: string;
  message: string;
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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const formData = req.body as ContactFormRequest;

    if (
      !formData.name ||
      !formData.email ||
      !formData.company ||
      !formData.message
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    if (!isValidEmail(formData.email)) {
      res.status(400).json({ error: "Invalid email address" });
      return;
    }

    formData.name = sanitizeInput(formData.name, 200);
    formData.email = formData.email.toLowerCase().trim();
    formData.company = sanitizeInput(formData.company, 200);
    formData.message = sanitizeInput(formData.message, 5000);

    const accessToken = await getAccessToken();

    const subject = `New Strategy Call Request – ${formData.company}`;
    const bodyHtml = formatContactFormAsHtml(formData);

    await sendEmailViaGraph(
      accessToken,
      "sales@secureautomations.ai",
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
