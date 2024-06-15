import { useEffect, useMemo, useRef } from "react";
import Toast from "react-native-toast-message";

import { getDateInterval, toLocalDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import type { GetDocumentResponse } from "@src/store";
import { useAppSelector, useFindAllQuery } from "@src/store";

export function useDocuments({ filter, showError = true }: { filter?: string | string[]; showError?: boolean } = {}) {
  const showErrorRef = useRef(showError);

  const userId = useAppSelector(state => state.user.userId) || "";
  const { data, isLoading, error } = useFindAllQuery(userId, { skip: !userId });

  useEffect(() => {
    if (showErrorRef.current && error) {
      Toast.show({
        type: "error",
        text1: "Data Load Error",
        text2: toErrorMessage(error),
      });
    }
  }, [error]);

  return {
    data: useMemo(() => getFilteredData(data, filter), [data, filter]),
    isLoading,
  };
}

function getFilteredData(data: GetDocumentResponse[] = [], filter: string | string[] | undefined) {
  return filter === "expiring" ? data.filter(document => getExpiringData(document)) : data;
}

function getExpiringData(document: GetDocumentResponse) {
  const expiryDate = toLocalDate(document.expiryDate);
  if (expiryDate == null) {
    return false;
  }

  const { interval } = getDateInterval(expiryDate, new Date());
  return interval !== "year";
}
