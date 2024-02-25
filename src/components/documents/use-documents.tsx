import { useAppSelector, useFindAllQuery } from "@src/store";

export function useDocuments() {
  const userId = useAppSelector(state => state.user.userId) || "";
  const { data = [], isLoading, error } = useFindAllQuery(userId, { skip: !userId });
  return { data, isLoading, error, userId };
}
