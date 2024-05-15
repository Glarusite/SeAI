import FullScreenCamera from "@src/components/scanner/full-screen-camera";
import { useFileUpload } from "@src/components/scanner/handle-file-upload";
import type { CameraView } from "expo-camera";
import { useCallback, useRef } from "react";
import Toast from "react-native-toast-message";

export default function CameraPage() {
  const { cameraRef, isLoading, takePicture } = useTakePicture();

  return <FullScreenCamera ref={cameraRef} isLoading={isLoading} onTakePicture={takePicture} />;
}

function useTakePicture() {
  const cameraRef = useRef<CameraView>(null);

  const { fileUpload, isLoading } = useFileUpload("cameraUpload");

  const takePicture = useCallback(async () => {
    if (cameraRef.current != null) {
      try {
        const picture = await cameraRef.current.takePictureAsync({ quality: 0.1 });
        if (picture?.uri == null) {
          throw new Error("No picture taken");
        }

        await fileUpload(picture.uri);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        Toast.show({
          type: "error",
          text1: "Camera error",
          text2: errorMessage,
        });
      }
    }
  }, [fileUpload]);

  return { cameraRef, isLoading, takePicture };
}
