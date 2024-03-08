import { toErrorMessage } from "@src/common/error";
import { downloadFile } from "@src/common/navigator";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { useAppSelector } from "@src/store";
import { baseUrl } from "@src/store/api.base";
import { randomUUID } from "expo-crypto";
import JSZip from "jszip";
import mime from "mime";
import { useCallback, useState } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

export function useDocumentsDownload(selection: Set<string> | undefined) {
  const { userId, accessToken } = useAppSelector(state => state.user);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadSelection = useCallback(async () => {
    if (Platform.OS !== "web") {
      showFeatureInDevelopmentToast();
      return;
    }

    if (selection == null || selection.size === 0) {
      Toast.show({
        type: "info",
        text1: "Nothing to download",
        text2: "At least one document must be selected to download",
      });
      return;
    }

    try {
      setIsDownloading(true);
      const files = await Promise.all(
        [...selection].map(async documentId => {
          const response = await fetch(`${baseUrl}/api/v1/users/${userId}/documents/${documentId}/files`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          const mimeType = response.headers.get("Content-Type") || "image/jpeg";
          const blob = await response.blob();
          const reader = new FileReader();
          const base64 = await new Promise<string>(resolve => {
            reader.addEventListener("load", () => resolve(reader.result as string));
            reader.readAsDataURL(blob);
          });

          return { base64, mimeType, documentId };
        }),
      );

      if (files.length === 1) {
        const { 0: file } = files;
        downloadFile(file.documentId, file.mimeType, file.base64);
      } else {
        const jsZip = new JSZip();
        for (const file of files) {
          const fileName = [file.documentId, mime.getExtension(file.mimeType)].join(".");
          if (fileName) {
            jsZip.file(fileName, file.base64.split(",")[1], { base64: true });
          }
        }

        const base64Zip = await jsZip.generateAsync({ type: "base64" });
        const zipMimeType = "application/zip";
        downloadFile(randomUUID(), zipMimeType, `data:${zipMimeType};base64,${base64Zip}`);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Download error",
        text2: toErrorMessage(error),
      });
    } finally {
      setIsDownloading(false);
    }
  }, [accessToken, selection, userId]);

  return { isDownloading, downloadSelection };
}
