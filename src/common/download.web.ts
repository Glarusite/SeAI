import mime from "mime";

export function downloadFile(fileName: string, mimeType: string, base64: string) {
  fileName = [fileName, mime.getExtension(mimeType)].join(".");
  const downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.href = base64.startsWith("data:") ? base64 : `data:${mimeType};base64,${base64}`;
  downloadLink.click();
}
