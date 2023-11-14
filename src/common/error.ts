import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function toErrorMessage(error: unknown) {
  const errorData =
    "data" in (error as FetchBaseQueryError)
      ? (error as FetchBaseQueryError).data
      : error instanceof Error
        ? error.message
        : error;
  const errorMessage = typeof errorData === "string" ? errorData : JSON.stringify(errorData);
  return errorMessage;
}
