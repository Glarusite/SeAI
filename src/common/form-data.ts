import { Platform } from "react-native";

export async function toFormData(uri: string) {
  const body = new FormData();
  if (Platform.OS === "web") {
    const fileResponse = await fetch(uri);
    const file = await fileResponse.blob();
    body.append("file", file);
  } else {
    const name = uri.split("/").pop();
    body.append("file", { uri, name });
  }

  return body;
}
