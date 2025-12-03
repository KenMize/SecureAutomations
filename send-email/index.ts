import {
  SendEmailRequest,
  formatFormDataAsHtml,
  getAccessToken,
  isValidEmail,
  sanitizeInput,
  sendEmailViaGraph,
} from "../shared/emailUtils";

module.exports = async function (context: any, req: any) {
  try {
    const formData = req.body as SendEmailRequest;

    // Validate required fields
    if (!formData.company_name || !formData.work_email) {
      context.res = {
        status: 400,
        body: { error: "Missing required fields" },
      };
      return;
    }

    // Validate email format
    if (!isValidEmail(formData.work_email)) {
      context.res = {
        status: 400,
        body: { error: "Invalid email address" },
      };
      return;
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

    context.res = {
      status: 200,
      body: { success: true, message: "Email sent successfully" },
    };
  } catch (error) {
    context.log("Error sending email:", error);
    context.res = {
      status: 500,
      body: {
        error: error instanceof Error ? error.message : "Failed to send email",
      },
    };
  }
};
