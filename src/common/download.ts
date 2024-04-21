import { documentDirectory, writeAsStringAsync } from "expo-file-system";
import { shareAsync } from "expo-sharing";
import mime from "mime";
import Toast from "react-native-toast-message";

import { toErrorMessage } from "./error";

export async function downloadFile(fileName: string, mimeType: string, base64: string) {
  fileName = [fileName, mime.getExtension(mimeType)].join(".");
  base64 = base64.replace(/^data:[^;]+;base64,/, "");
  try {
    await writeAsStringAsync(`${documentDirectory}${fileName}`, base64, {
      encoding: "base64",
    });

    Toast.show({
      type: "success",
      text1: "Download complete",
      text2: `File saved as ${fileName}`,
    });

    await shareAsync(`${documentDirectory}${fileName}`, {
      dialogTitle: "Share personal data report",
      mimeType,
      UTI: "public.plain-text",
    });
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Download error",
      text2: toErrorMessage(error),
    });
  }
}
