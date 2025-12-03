import {
  ContactFormRequest,
  formatContactFormAsHtml,
  getAccessToken,
  isValidEmail,
  sanitizeInput,
  sendEmailViaGraph,
} from "../shared/emailUtils";

module.exports = async function (context: any, req: any) {
  try {
    const formData = req.body as ContactFormRequest;

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.company ||
      !formData.message
    ) {
      context.res = {
        status: 400,
        body: { error: "Missing required fields" },
      };
      return;
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
      context.res = {
        status: 400,
        body: { error: "Invalid email address" },
      };
      return;
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

    context.res = {
      status: 200,
      body: { success: true, message: "Email sent successfully" },
    };
  } catch (error) {
    context.log("Error sending email:", error);
    context.res = {
      status: 500,
      body: {
        error:
          error instanceof Error ? error.message : "Failed to send email",
      },
    };
  }
};
