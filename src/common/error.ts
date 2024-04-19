import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { ApiErrorResponse } from "@src/models";

export function toErrorMessage(error: unknown) {
  const errorData =
    typeof error === "object" && "data" in (error as FetchBaseQueryError)
      ? flattenErrorData(error as FetchBaseQueryError)
      : error instanceof Error
        ? error.message
        : error;

  const errorMessage = typeof errorData === "string" ? errorData : JSON.stringify(errorData);

  return errorMessage;
}

function flattenErrorData(error: FetchBaseQueryError) {
  const { data } = error;
  if (typeof data === "string") {
    return data;
  }

  if (typeof data === "object") {
    return "detail" in (data as ApiErrorResponse)
      ? (data as ApiErrorResponse).detail
      : "error" in (data as ApiErrorResponse)
        ? (data as ApiErrorResponse).error
        : error;
  }
}
