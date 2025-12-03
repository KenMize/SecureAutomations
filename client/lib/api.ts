const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");
const trimLeadingSlash = (value: string) => value.replace(/^\//, "");

// Railway backend URL - will be set via environment variable during build
// For development, this is ignored and /api is used instead
const RAILWAY_API_BASE = import.meta.env.VITE_API_BASE_URL as string | undefined;

function getApiBaseUrl(): string {
  // Server-side: use relative /api
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

  // Production: use Railway backend if configured
  // GitHub Pages is at secureautomations.ai, Railway is on a separate domain
  // The build process must set VITE_API_BASE_URL to the Railway URL
  if (RAILWAY_API_BASE) {
    return RAILWAY_API_BASE;
  }

  // Fallback: try same domain (for GitHub Pages SSR scenario - though unlikely to work)
  return "/api";
}

export const API_BASE_URL = getApiBaseUrl();

export const apiUrl = (path: string) =>
  `${trimTrailingSlash(API_BASE_URL)}/${trimLeadingSlash(path)}`;

export const getEnvVar = (key: string) =>
  (import.meta.env as Record<string, string | undefined>)[key];
