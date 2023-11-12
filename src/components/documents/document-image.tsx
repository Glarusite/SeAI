import { useAsync } from "@src/common/hooks";
import { useAppSelector } from "@src/store";
import { baseUrl } from "@src/store/api.base";
import type { ImageSource } from "expo-image";
import { Image } from "expo-image";
import { useEffect, useMemo, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Icon } from "react-native-paper";

export interface DocumentImageProps {
  documentId: string | undefined;
  size: number;
}

export default function DocumentImage({ documentId, size }: DocumentImageProps) {
  const { userId, accessToken } = useAppSelector(state => state.user);
  const [uri, setUri] = useState<string | ImageSource>();
  const styles = useStyles({ size });

  useAsync(async () => {
    if (!userId || !accessToken || !documentId) {
      return;
    }

    const apiUri = `${baseUrl}/api/v1/users/${userId}/documents/${documentId}/download`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    if (Platform.OS !== "web") {
      setUri({ uri: apiUri, headers });
      return;
    }

    const imageResponse = await fetch(apiUri, { headers });
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
    <View style={styles.container}>
      {uri ? <Image source={uri} style={styles.image} contentFit="contain" /> : <Icon source="file" size={size} />}
    </View>
  );
}

function useStyles({ size }: Pick<DocumentImageProps, "size">) {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingStart: 16,
        },

        image: {
          width: size,
          minHeight: size,
          height: "100%",
        },
      }),
    [size],
  );
}
