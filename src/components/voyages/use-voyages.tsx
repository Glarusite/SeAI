import { useAppSelector, useFindAllByUserQuery } from "@src/store";

export function useVoyages() {
  const userId = useAppSelector(state => state.user.userId) || "";
  const { data = [], isLoading, error } = useFindAllByUserQuery(userId, { skip: !userId });
  return { data: [...data].reverse(), isLoading, error };
}
