const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");
const trimLeadingSlash = (value: string) => value.replace(/^\//, "");

// Vercel serves API routes from /api automatically
// Both development and production use the same relative path
export const API_BASE_URL = "/api";

export const apiUrl = (path: string) =>
  `${trimTrailingSlash(API_BASE_URL)}/${trimLeadingSlash(path)}`;

export const getEnvVar = (key: string) =>
  (import.meta.env as Record<string, string | undefined>)[key];
