const DEFAULT_PROD_API_BASE =
  "https://secureautomations-api-ddfeayg5emd3e3dj.canadacentral-01.azurewebsites.net/api";

const fallbackBaseUrl = import.meta.env.PROD ? DEFAULT_PROD_API_BASE : "/api";

const envVars = import.meta.env as Record<string, string | undefined>;

export const API_BASE_URL = envVars.VITE_API_BASE_URL ?? fallbackBaseUrl;

const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");
const trimLeadingSlash = (value: string) => value.replace(/^\//, "");

export const apiUrl = (path: string) =>
  `${trimTrailingSlash(API_BASE_URL)}/${trimLeadingSlash(path)}`;

export const getEnvVar = (key: string) => envVars[key];
