import { CameraView } from "expo-camera";
import { useState } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import type { LinkButtonProps } from "../ui/buttons/link-button";
import LinkButton from "../ui/buttons/link-button";

import { useAsync } from "@src/common/hooks";

export interface CameraLinkButtonProps extends Omit<LinkButtonProps, "children"> {
  children(this: void, isCameraChecking: boolean): React.ReactNode;
}

export default function CameraLinkButton({ children, disabled, ...props }: CameraLinkButtonProps) {
  const { isCameraAvailable, isCameraChecking } = useCameraStatus();

  if (!isCameraAvailable) {
    return;
  }

  return (
    <LinkButton disabled={disabled || !isCameraAvailable} {...props}>
      {isCameraChecking && <ButtonActivityIndicator />}
      {children(isCameraChecking)}
    </LinkButton>
  );
}

function useCameraStatus() {
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  const [isCameraChecking, setIsCameraChecking] = useState(true);

  useAsync(async () => {
    try {
      if (Platform.OS === "web") {
        const isAvailable = await CameraView.isAvailableAsync();
        setIsCameraAvailable(isAvailable);
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
