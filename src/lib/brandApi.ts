import { DATABASE_UNAVAILABLE_MESSAGE, isDatabaseUnavailableError, jsonError } from "@/lib/api";

export function brandApiError(error: unknown, fallbackMessage: string, fallbackStatus = 400) {
  if (error && typeof error === "object" && "code" in error && error.code === "P2021") {
    return jsonError("Brand storage is not initialized. Run the database migration before managing brands.", 503);
  }

  const status = isDatabaseUnavailableError(error) ? 503 : fallbackStatus;
  return jsonError(status === 503 ? DATABASE_UNAVAILABLE_MESSAGE : fallbackMessage, status);
}