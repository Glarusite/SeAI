import { getDocumentAsync } from "expo-document-picker";
import { useCallback } from "react";
import { Button, ButtonProps } from "react-native-paper";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";

import { useFileUpload } from "./handle-file-upload";

export type PdfUploadButtonProps = Omit<ButtonProps, "onPress">;

export default function PdfUploadButton({ children, ...props }: PdfUploadButtonProps) {
  const { pdfUpload, isLoading } = usePdfUpload();

  return (
    <Button onPress={pdfUpload} disabled={isLoading} {...props}>
      <>
        {isLoading && <ButtonActivityIndicator />}
        {children}
      </>
    </Button>
  );
}

function usePdfUpload() {
  const { fileUpload, isLoading } = useFileUpload("pdfUpload");

  const pdfUpload = useCallback(async () => {
    const { assets, canceled } = await getDocumentAsync({ type: "application/pdf" });

    if (!canceled) {
      await fileUpload(assets[0].uri);
    }
  }, [fileUpload]);

  return { pdfUpload, isLoading };
}
