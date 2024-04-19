import { getDateInterval, toLocalDate } from "@src/common/date";
import type { GetDocumentResponse } from "@src/store";
import { useAppSelector, useFindAllQuery } from "@src/store";
import { useMemo } from "react";

export function useDocuments(filter?: string | string[]) {
  const userId = useAppSelector(state => state.user.userId) || "";
  const { data = [], isLoading, error } = useFindAllQuery(userId, { skip: !userId });
  return {
    data: useMemo(() => getFilteredData(data, filter), [data, filter]),
    isLoading,
    error,
  };
}

function getFilteredData(data: GetDocumentResponse[], filter: string | string[] | undefined) {
  return filter === "expiring"
    ? data.filter(document => getExpiringData(document))
    : filter === "expired"
      ? data.filter(document => getExpiredData(document))
      : data;
}

function getExpiringData(document: GetDocumentResponse) {
  const { value = 0, interval } = getExpiryInterval(document) || {};
  return value > 0 && interval !== "year";
}

function getExpiredData(document: GetDocumentResponse) {
  const { value = 0 } = getExpiryInterval(document) || {};
  return value < 0;
}

function getExpiryInterval(document: GetDocumentResponse) {
  const expiryDate = toLocalDate(document.expiryDate);
  if (expiryDate == null) {
    return;
  }

  return getDateInterval(expiryDate, new Date());
}
