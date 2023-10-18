import { toErrorMessage } from "@src/common/error";
import { useAppSelector, useHandleFileUploadMutation } from "@src/store";
import { useCallback } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

export function useFileUpload(fixedCacheKey: string) {
  const userId = useAppSelector(state => state.user.userId);
  const [handleFileUpload, { isLoading }] = useHandleFileUploadMutation({ fixedCacheKey });

  const fileUpload = useCallback(
    async (uri: string) => {
      if (userId == null) {
        return;
      }

      const body = new FormData();
      if (Platform.OS === "web") {
        const fileResponse = await fetch(uri);
        const file = await fileResponse.blob();
        body.append("file", file);
      } else {
        const name = uri.split("/").pop();
        body.append("file", { uri, name });
      }

      try {
        const response = await handleFileUpload({ userId, body }).unwrap();
        console.log(response);
      } catch (error) {
        Toast.show({ type: "error", text1: "Upload error", text2: toErrorMessage(error) });
      }
    },
    [handleFileUpload, userId],
  );

  return { fileUpload, isLoading };
}
