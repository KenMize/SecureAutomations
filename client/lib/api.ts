const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");
const trimLeadingSlash = (value: string) => value.replace(/^\//, "");

const AZURE_API_BASE =
  "https://secureautomations-api-ddfeayg5emd3e3dj.canadacentral-01.azurewebsites.net/api";

function getApiBaseUrl(): string {
  const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (envBase) {
    return envBase;
  }

  if (typeof window === "undefined") {
    return AZURE_API_BASE;
  }

  const hostname = window.location.hostname;
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.");

  return isLocalhost ? "/api" : AZURE_API_BASE;
}

export const API_BASE_URL = getApiBaseUrl();

export const apiUrl = (path: string) =>
  `${trimTrailingSlash(API_BASE_URL)}/${trimLeadingSlash(path)}`;

export const getEnvVar = (key: string) =>
  (import.meta.env as Record<string, string | undefined>)[key];
