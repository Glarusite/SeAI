import { Image } from "expo-image";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-paper";

import { useDocumentImageUri } from "./use-document-image";

export interface DocumentImageProps {
  documentId: string | undefined;
  size: number;
}

export default function DocumentThumbnail({ documentId, size }: DocumentImageProps) {
  const styles = useStyles({ size });
  const uri = useDocumentImageUri(documentId);

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
