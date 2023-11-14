import { useAppSelector, useSaveDocument1Query } from "@src/store";

export function useDocuments() {
  const userId = useAppSelector(state => state.user.userId) || "";
  const { data = [], isLoading, error } = useSaveDocument1Query(userId, { skip: !userId });
  return { data, isLoading, error };
}
