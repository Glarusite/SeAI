import { useAppDimensions } from "@src/common/hooks";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { Image } from "expo-image";
import { useMemo } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { DocumentForm } from "./document-form";
import { useDocumentImageUri } from "./use-document-image";

export interface DocumentFormViewProps {
  documentId?: string;
  wide: boolean;
}

export default function DocumentFormView(props: DocumentFormViewProps) {
  const { styles, uri } = useDocumentPage(props);

  return (
    <View style={styles.container}>
      {uri ? (
        <TouchableHighlight style={styles.addImageContainer} onPress={showFeatureInDevelopmentToast}>
          <>
            <Text style={styles.addImageText}>Press to upload new photo</Text>
            <Image source={uri} style={styles.image} contentFit="contain" />
          </>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight style={styles.addImageContainer} onPress={showFeatureInDevelopmentToast}>
          <Text style={styles.addImageText}>Add image</Text>
        </TouchableHighlight>
      )}
      <View style={styles.formContainer}>
        <DocumentForm id={props.documentId} />
      </View>
    </View>
  );
}

function useDocumentPage({ documentId, wide }: DocumentFormViewProps) {
  const { height } = useAppDimensions();
  const styles = useStyles(height, wide);
  const uri = useDocumentImageUri(documentId);

  return { styles, uri };
}

function useStyles(height: number, wide: boolean) {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: wide ? "row" : undefined,
          gap: 10,
          marginRight: 10,
        },

        addImageContainer: {
          flex: 1,
          borderStyle: "dashed",
          borderRadius: 10,
          borderWidth: 5,
          borderColor: colors.inverseSurface,
          width: wide ? "50%" : undefined,
          justifyContent: "center",
        },

        addImageText: {
          alignSelf: "center",
          justifyContent: "center",
          paddingTop: 32,
        },

        image: {
          height: "100%",
        },

        formContainer: {
          width: wide ? "50%" : undefined,
          justifyContent: "center",
        },
      }),
    [colors.inverseSurface, wide],
  );
}
