const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");
const trimLeadingSlash = (value: string) => value.replace(/^\//, "");

function getApiBaseUrl(): string {
  // Check for explicit environment variable first
  const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (envBase) {
    return envBase;
  }

  // Server-side: use relative /api (will be handled by Express)
  if (typeof window === "undefined") {
    return "/api";
  }

  // Client-side: determine based on hostname
  const hostname = window.location.hostname;
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.");

  if (isLocalhost) {
    // Development: use local Express server
    return "/api";
  }

  // Production: use Railway backend
  // Railway URL format will be something like https://securautomations-prod-xxxx.railway.app
  // Since we're using GitHub Pages at secureautomations.ai, and Railway has a different domain,
  // we need to use the full Railway URL. This will be set via VITE_API_BASE_URL env var during build.
  // For now, assume the API is available at the same domain if not specified
  return "/api";
}

export const API_BASE_URL = getApiBaseUrl();

export const apiUrl = (path: string) =>
  `${trimTrailingSlash(API_BASE_URL)}/${trimLeadingSlash(path)}`;

export const getEnvVar = (key: string) =>
  (import.meta.env as Record<string, string | undefined>)[key];
