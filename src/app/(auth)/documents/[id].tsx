import { useAppDimensions } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import { DocumentForm } from "@src/components/documents/document-form";
import { useDocumentImageUri } from "@src/components/documents/use-document-image";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export default function DocumentPage() {
  const { id } = useLocalSearchParams();
  const { height, width } = useAppDimensions();
  const wide = width >= 720;
  const styles = useStyles(height, wide);

  const documentId = Array.isArray(id) ? id[0] : id;
  const uri = useDocumentImageUri(documentId);

  return (
    <AppScrollView wide={wide} style={styles.container}>
      <Image source={uri} style={styles.image} contentFit="contain" />
      <View style={styles.formContainer}>
        <DocumentForm id={documentId} />
      </View>
    </AppScrollView>
  );
}

function useStyles(height: number, wide: boolean) {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: wide ? "row" : undefined,
        },

        image: {
          height: wide ? height - 96 : height / 3,
          width: wide ? "50%" : undefined,
        },

        formContainer: {
          width: wide ? "50%" : undefined,
          justifyContent: "center",
        },
      }),
    [height, wide],
  );
}
