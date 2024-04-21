import { getDateInterval, toLocalDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import type { GetDocumentResponse } from "@src/store";
import { useAppSelector, useFindAllQuery } from "@src/store";
import { useEffect, useMemo } from "react";
import Toast from "react-native-toast-message";

export function useDocuments({ filter, showError = true }: { filter?: string | string[]; showError?: boolean } = {}) {
  const userId = useAppSelector(state => state.user.userId) || "";
  const { data, isLoading, error } = useFindAllQuery(userId, { skip: !userId });

  useEffect(() => {
    if (showError && error) {
      Toast.show({
        type: "error",
        text1: "Data Load Error",
        text2: toErrorMessage(error),
      });
    }
  });

  return {
    data: useMemo(() => getFilteredData(data, filter), [data, filter]),
    isLoading,
  };
}

function getFilteredData(data: GetDocumentResponse[] = [], filter: string | string[] | undefined) {
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
