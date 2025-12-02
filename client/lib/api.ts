const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");
const trimLeadingSlash = (value: string) => value.replace(/^\//, "");

function getApiBaseUrl(): string {
  const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (envBase) {
    return envBase;
  }

  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.startsWith("192.168."));

  if (isLocalhost) {
    return "/api";
  }

  return "https://secureautomations-api-ddfeayg5emd3e3dj.canadacentral-01.azurewebsites.net/api";
}

export const API_BASE_URL = getApiBaseUrl();

export const apiUrl = (path: string) =>
  `${trimTrailingSlash(API_BASE_URL)}/${trimLeadingSlash(path)}`;

export const getEnvVar = (key: string) =>
  (import.meta.env as Record<string, string | undefined>)[key];
