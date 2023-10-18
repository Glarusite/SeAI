import { useAsyncEffect } from "@src/common/hooks";
import { Camera } from "expo-camera";
import { useState } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import LinkButton, { LinkButtonProps } from "../ui/buttons/link-button";

export interface CameraLinkButtonProps<T> extends Omit<LinkButtonProps<T>, "children"> {
  children(isCameraAvailable: boolean, isCameraChecking: boolean): React.ReactNode;
}

export default function CameraLinkButton<T>({ children, disabled, ...props }: CameraLinkButtonProps<T>) {
  const { isCameraAvailable, isCameraChecking } = useCameraStatus();

  return (
    <LinkButton disabled={disabled || !isCameraAvailable} {...props}>
      {isCameraChecking && <ButtonActivityIndicator />}
      {children(isCameraAvailable, isCameraChecking)}
    </LinkButton>
  );
}

function useCameraStatus() {
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  const [isCameraChecking, setIsCameraChecking] = useState(true);

  useAsyncEffect(async () => {
    try {
      if (Platform.OS === "web") {
        const [isAvailable, cameraTypes] = await Promise.all([
          Camera.isAvailableAsync(),
          Camera.getAvailableCameraTypesAsync(),
        ]);

        setIsCameraAvailable(isAvailable && cameraTypes.length > 0);
      } else {
        setIsCameraAvailable(true);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Camera check error",
        text2: error instanceof Error ? error.message : JSON.stringify(error),
      });
    } finally {
      setIsCameraChecking(false);
    }
  }, []);

  return { isCameraAvailable, isCameraChecking };
}
