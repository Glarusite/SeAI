import { toLocalDate } from "@src/common/date";
import { toErrorMessage } from "@src/common/error";
import { useAppSelector, useFindAllByUserQuery } from "@src/store";
import { useEffect, useMemo } from "react";
import Toast from "react-native-toast-message";

export function useVoyages() {
  const userId = useAppSelector(state => state.user.userId) || "";
  const { data, isLoading, error } = useFindAllByUserQuery(userId, { skip: !userId });

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Data Load Error",
        text2: toErrorMessage(error),
      });
    }
  }, [error]);

  return {
    data: useMemo(
      () =>
        data
          ? data
              .filter(item => toLocalDate(item.joiningDate))
              .sort((a, b) => toLocalDate(b.joiningDate)!.getTime() - toLocalDate(a.joiningDate)!.getTime())
          : [],
      [data],
    ),
    isLoading,
  };
}
