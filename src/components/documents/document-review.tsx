import { useAppDimensions } from "@src/common/hooks";
import { Image } from "expo-image";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { DocumentForm } from "./document-form";
import { useDocumentImageUri } from "./use-document-image";

export interface DocumentReviewProps {
  documentId: string;
  wide: boolean;
}

export default function DocumentReview(props: DocumentReviewProps) {
  const { styles, uri } = useDocumentPage(props);

  return (
    <View style={styles.container}>
      <Image source={uri} style={styles.image} contentFit="contain" />
      <View style={styles.formContainer}>
        <DocumentForm id={props.documentId} />
      </View>
    </View>
  );
}

function useDocumentPage({ documentId, wide }: DocumentReviewProps) {
  const { height } = useAppDimensions();
  const styles = useStyles(height, wide);
  const uri = useDocumentImageUri(documentId);

  return { styles, uri };
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
