import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { ApiErrorResponse } from "@src/models";

import { safeJsonParse } from "./json";

export function toErrorMessage(error: unknown) {
  error = typeof error === "string" ? safeJsonParse(error) : error;
  const errorData =
    flattenQueryErrorData(error) || flattenApiError(error) || (error instanceof Error ? error.message : error);

  const errorMessage = typeof errorData === "string" ? errorData : JSON.stringify(errorData);

  return errorMessage;
}

function flattenQueryErrorData(error: unknown) {
  if (typeof error === "object" && "data" in (error as FetchBaseQueryError)) {
    const { data } = error as FetchBaseQueryError;
    if (typeof data === "string") {
      const jsonData = safeJsonParse(data);
      if (jsonData) {
        return flattenApiError(jsonData);
      }

      return data;
    }
  }
}
function flattenApiError(error: unknown) {
  if (typeof error === "object") {
    if ("detail" in (error as ApiErrorResponse)) {
      const { detail } = error as ApiErrorResponse;
      return detail;
    }

    if ("error" in (error as ApiErrorResponse)) {
      return (error as ApiErrorResponse).error;
    }
  }
}
