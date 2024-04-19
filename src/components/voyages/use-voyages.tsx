import { toLocalDate } from "@src/common/date";
import { useAppSelector, useFindAllByUserQuery } from "@src/store";
import { useMemo } from "react";

export function useVoyages() {
  const userId = useAppSelector(state => state.user.userId) || "";
  const { data = [], isLoading, error } = useFindAllByUserQuery(userId, { skip: !userId });

  return {
    data: useMemo(
      () =>
        [...data]
          .filter(item => toLocalDate(item.joiningDate))
          .sort((a, b) => toLocalDate(b.joiningDate)!.getTime() - toLocalDate(a.joiningDate)!.getTime()),
      [data],
    ),
    isLoading,
    error,
  };
}
