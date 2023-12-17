import { toLocalDate } from "@src/common/date";
import { useAppSelector, useFindAllByUserQuery } from "@src/store";

export function useVoyages() {
  const userId = useAppSelector(state => state.user.userId) || "";
  const { data = [], isLoading, error } = useFindAllByUserQuery(userId, { skip: !userId });
  const sortedData = [...data]
    .filter(item => toLocalDate(item.joiningDate))
    .sort((a, b) => toLocalDate(b.joiningDate)!.getTime() - toLocalDate(a.joiningDate)!.getTime());

  return { data: sortedData, isLoading, error };
}
