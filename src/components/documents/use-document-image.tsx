import { useIsFocused } from "@react-navigation/native";
import { useAsync } from "@src/common/hooks";
import { useAppSelector } from "@src/store";
import { baseUrl } from "@src/store/api.base";
import type { ImageSource } from "expo-image";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export function useDocumentImageUri(documentId: string | undefined) {
  const { userId, accessToken } = useAppSelector(state => state.user);
  const [uri, setUri] = useState<string | ImageSource>();
  const scan = useAppSelector(state => state.scan);
  const isFocused = useIsFocused();

  useAsync(async () => {
    if (documentId === scan.id) {
      setUri(scan.uri);
      return;
    }

    if (!(userId && accessToken)) {
      return;
    }

    if (!isFocused) {
      return;
    }

    // TODO: Keep url synchronized
    const apiUri = `${baseUrl}/api/v1/users/${userId}/documents/${documentId}/files`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    if (Platform.OS !== "web") {
      setUri({ uri: apiUri, headers });
      return;
    }

    const imageResponse = await fetch(apiUri, { headers });
    if (imageResponse.ok) {
      setUri(URL.createObjectURL(await imageResponse.blob()));
    }
  }, [accessToken, documentId, scan.uri, userId, isFocused]);

  useEffect(
    () => () => {
      if (typeof uri === "string") {
        URL.revokeObjectURL(uri);
      }
    },
    [uri],
  );

  return uri;
}
