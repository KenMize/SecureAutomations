import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  QuizSubmissionRequest,
  formatQuizResultsAsHtml,
  getAccessToken,
  isValidEmail,
  sanitizeInput,
  sendEmailViaGraph,
} from "../shared/emailUtils";

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest,
): Promise<void> => {
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
      "sales@secureautomations.ai",
      subject,
      bodyHtml,
    );

    context.res = {
      status: 200,
      body: {
        success: true,
        message: "Quiz results sent successfully",
      },
    };
  } catch (error) {
    context.log("Error sending quiz results:", error);
    context.res = {
      status: 500,
      body: {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send quiz results",
      },
    };
  }
};

export default httpTrigger;
