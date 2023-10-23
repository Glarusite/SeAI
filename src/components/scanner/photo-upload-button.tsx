import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { useCallback } from "react";
import type { ButtonProps } from "react-native-paper";
import { Button } from "react-native-paper";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";

import { useFileUpload } from "./handle-file-upload";

export type PhotoUploadButtonProps = Omit<ButtonProps, "onPress">;

export default function PhotoUploadButton({ children, ...props }: PhotoUploadButtonProps) {
  const { imageUpload, isLoading } = useImageUpload();

  return (
    <Button onPress={imageUpload} disabled={isLoading} {...props}>
      <>
        {isLoading && <ButtonActivityIndicator />}
        {children}
      </>
    </Button>
  );
}

function useImageUpload() {
  const { fileUpload, isLoading } = useFileUpload("imageUpload");

  const imageUpload = useCallback(async () => {
    const { assets, canceled } = await launchImageLibraryAsync({ mediaTypes: MediaTypeOptions.Images });

    if (!canceled) {
      await fileUpload(assets[0].uri);
    }
  }, [fileUpload]);

  return { imageUpload, isLoading };
}
