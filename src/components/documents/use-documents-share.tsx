import { toErrorMessage } from "@src/common/error";
import { showFeatureInDevelopmentToast } from "@src/common/toast";
import { useAppSelector } from "@src/store";
import { baseUrl } from "@src/store/api.base";
import { randomUUID } from "expo-crypto";
import type { FileSystemDownloadResult } from "expo-file-system";
import {
  EncodingType,
  cacheDirectory,
  downloadAsync,
  moveAsync,
  readAsStringAsync,
  writeAsStringAsync,
} from "expo-file-system";
import { isAvailableAsync, shareAsync } from "expo-sharing";
import JSZip from "jszip";
import mime from "mime";
import { useCallback, useState } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

export function useDocumentsShare(selection: ReadonlySet<string> | undefined) {
  const { userId, accessToken } = useAppSelector(state => state.user);
  const [isSharing, setIsSharing] = useState(false);

  const shareSelection = useCallback(async () => {
    if (selection == null || selection.size === 0) {
      Toast.show({
        type: "info",
        text1: "Nothing to share",
        text2: "At least one document must be selected to share",
      });

      return;
    }

    if (Platform.OS === "web") {
      showFeatureInDevelopmentToast();
    } else {
      if ((await isAvailableAsync()) && cacheDirectory != null) {
        try {
          setIsSharing(true);
          const files = await Promise.all(
            [...selection].map(documentId => downloadImageAsync({ userId, documentId, accessToken })),
          );

          if (files.length === 1) {
            const { 0: file } = files;
            if (file.mimeType === "application/json") {
              const error = await readAsStringAsync(file.uri);
              throw new Error(toErrorMessage(error));
            } else {
              const fileUriWithExtension = `${file.uri}.${getFileExtension(file.mimeType)}`;
              await moveAsync({ from: file.uri, to: fileUriWithExtension });
              await shareAsync(fileUriWithExtension, { dialogTitle: "Share document" });
            }
          } else {
            const zipFileUri = await zipFilesAsync(files);
            await shareAsync(zipFileUri, { dialogTitle: "Share documents" });
          }
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Sharing error",
            text2: toErrorMessage(error),
          });
        } finally {
          setIsSharing(false);
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Sharing unsupported",
          text2: "Sharing files is not supported on this device",
        });
      }
    }
  }, [accessToken, selection, userId]);

  return { isSharing, shareSelection };
}

function downloadImageAsync({
  userId,
  documentId,
  accessToken,
}: {
  userId: string | undefined;
  documentId: string;
  accessToken: string | undefined;
}) {
  return downloadAsync(
    `${baseUrl}/api/v1/users/${userId}/documents/${documentId}/files`,
    `${cacheDirectory}${documentId}`,
    {
      cache: true,
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
}

async function zipFilesAsync(files: FileSystemDownloadResult[]) {
  const base64Files = await Promise.all(
    files.map(file => readAsStringAsync(file.uri, { encoding: EncodingType.Base64 })),
  );

  const fileErrorIndex = files.findIndex(file => file.mimeType === "application/json");
  if (fileErrorIndex > 0) {
    const error = atob(base64Files[fileErrorIndex]);
    throw new Error(toErrorMessage(error));
  }

  const jsZip = new JSZip();
  for (const [index, file] of files.entries()) {
    const fileName = file.uri.split("/").at(-1);
    if (fileName) {
      const extension = getFileExtension(file.mimeType);
      jsZip.file(`${fileName}.${extension}`, base64Files[index], { base64: true });
    }
  }

  const base64Zip = await jsZip.generateAsync({ type: "base64" });
  const zipFileUri = `${cacheDirectory}${randomUUID()}.zip`;
  await writeAsStringAsync(zipFileUri, base64Zip, { encoding: "base64" });

  return zipFileUri;
}

function getFileExtension(mimeType: string | null) {
  return (mimeType && mime.getExtension(mimeType)) || "jpg";
}
