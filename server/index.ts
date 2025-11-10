import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleSendEmail,
  handleContactForm,
  handleQuizSubmission,
} from "./routes/email";

// Simple rate limiting middleware
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function rateLimit(windowMs: number = 60000, maxRequests: number = 5) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (record && record.resetTime > now) {
      if (record.count >= maxRequests) {
        return res
          .status(429)
          .json({ error: "Too many requests. Please try again later." });
      }
      record.count++;
    } else {
      rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    }

    next();
  };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime <= now) {
      rateLimitStore.delete(key);
    }
  }
}, 300000); // Clean up every 5 minutes

export function createServer() {
  const app = express();

  // Security middleware
  const allowedOrigins = [
    "https://secureautomations.ai",
    "https://www.secureautomations.ai",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8080",
  ];

  const isDevelopment = process.env.NODE_ENV !== "production";

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else if (isDevelopment && origin && origin.startsWith("http://localhost")) {
          callback(null, true);
        } else if (isDevelopment && origin && origin.startsWith("http://127.0.0.1")) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      optionsSuccessStatus: 200,
    }),
  );

  // Limit request payload size
  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Apply rate limiting to form submission endpoints
  app.post("/api/send-email", rateLimit(60000, 5), handleSendEmail);
  app.post("/api/contact-form", rateLimit(60000, 5), handleContactForm);
  app.post("/api/submit-quiz", rateLimit(60000, 5), handleQuizSubmission);

  return app;
}
