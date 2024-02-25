import { toErrorMessage } from "@src/common/error";
import { toFormData } from "@src/common/form-data";
import { useAppDispatch, useAppSelector, useUploadMutation } from "@src/store";
import { setScan } from "@src/store/slices/scan";
import { router } from "expo-router";
import { useCallback } from "react";
import Toast from "react-native-toast-message";

export function useFileUpload(fixedCacheKey: string) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.user.userId) || "";
  const [uploadScan, { isLoading }] = useUploadMutation({ fixedCacheKey });

  const fileUpload = useCallback(
    async (uri: string) => {
      if (userId == null) {
        return;
      }

      try {
        const body = await toFormData(uri);
        const { id } = await uploadScan({ userId, body }).unwrap();
        router.push(`/documents/${id}`);
      } catch (scanError) {
        Toast.show({
          type: "info",
          text1: "Scan unsuccessful, add data manually",
          text2: toErrorMessage(scanError),
        });
        router.push(`/documents/new`);
      } finally {
        dispatch(setScan({ uri }));
      }
    },
    [dispatch, uploadScan, userId],
  );

  return { fileUpload, isLoading };
}
