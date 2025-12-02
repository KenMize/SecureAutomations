const DEFAULT_PROD_API_BASE =
  "https://secureautomations-api-ddfeayg5emd3e3dj.canadacentral-01.azurewebsites.net/api";

const fallbackBaseUrl = import.meta.env.PROD ? DEFAULT_PROD_API_BASE : "/api";

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? fallbackBaseUrl;

const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");
const trimLeadingSlash = (value: string) => value.replace(/^\//, "");

export const apiUrl = (path: string) =>
  `${trimTrailingSlash(API_BASE_URL)}/${trimLeadingSlash(path)}`;
