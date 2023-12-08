import { useAppSelector, useFindAllUserDocumentsQuery } from "@src/store";

export function useDocuments() {
  const userId = useAppSelector(state => state.user.userId) || "";
  const { data = [], isLoading, error } = useFindAllUserDocumentsQuery(userId, { skip: !userId });
  return { data, isLoading, error };
}
