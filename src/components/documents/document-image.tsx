import { useAsync } from "@src/common/hooks";
import { useAppSelector } from "@src/store";
import { baseUrl } from "@src/store/api.base";
import type { ImageSource } from "expo-image";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";

export interface DocumentImageProps {
  documentId: string | undefined;
}

export default function DocumentImage({ documentId = "" }: DocumentImageProps) {
  const { userId, accessToken } = useAppSelector(state => state.user);
  const [uri, setUri] = useState<string | ImageSource>();

  useAsync(async () => {
    const uri = `${baseUrl}/api/v1/users/${userId}/documents/${documentId}/download`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    if (Platform.OS !== "web") {
      setUri({ uri, headers });
      return;
    }

    const imageResponse = await fetch(uri, { headers });
    if (imageResponse.ok) {
      setUri(URL.createObjectURL(await imageResponse.blob()));
    }
  }, [accessToken, documentId, userId]);

  useEffect(
    () => () => {
      if (typeof uri === "string") {
        URL.revokeObjectURL(uri);
      }
    },
    [uri],
  );

  return (
    <View style={{ paddingStart: 16 }}>
      <Image source={uri} style={{ width: 100, height: "100%" }} contentFit="contain" />
    </View>
  );
}
