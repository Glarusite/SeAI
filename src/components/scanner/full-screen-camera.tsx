import { safeBack } from "@src/common/router";
import BackButton from "@src/components/ui/buttons/back-button";
import ButtonActivityIndicator from "@src/components/ui/buttons/button-activity-indicator";
import { setAppValue, useAppDispatch } from "@src/store";
import { Camera, CameraType } from "expo-camera";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import type { ButtonProps } from "react-native-paper";
import { ActivityIndicator, Button, Icon } from "react-native-paper";

export interface FullScreenCameraProps {
  isLoading?: boolean;
  onTakePicture: ButtonProps["onPress"];
}

const FullScreenCamera = forwardRef<Camera, FullScreenCameraProps>(function FullScreenCamera(
  { isLoading, onTakePicture },
  cameraRef,
) {
  const { isCameraReady, permission, onCameraReady } = useFullScreenCamera();

  if (permission == null) {
    return (
      <>
        <ActivityIndicator size={240} />
      </>
    );
  }

  return (
    <>
      <Camera style={styles.camera} ref={cameraRef} type={CameraType.back} onCameraReady={onCameraReady}>
        <SafeAreaView style={styles.overlay}>
          <View style={styles.container}>
            <Button onPress={onTakePicture} mode="contained" disabled={!isCameraReady}>
              {isLoading ? <ButtonActivityIndicator /> : <Icon source="camera" size={16} />}
            </Button>
            <BackButton mode="elevated" />
          </View>
        </SafeAreaView>
      </Camera>
    </>
  );
});

export default FullScreenCamera;

function useFullScreenCamera() {
  const dispatch = useAppDispatch();
  const [permission] = Camera.useCameraPermissions({ request: true });
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    dispatch(setAppValue({ name: "fullscreen", value: true }));
    return () => {
      dispatch(setAppValue({ name: "fullscreen", value: false }));
    };
  }, [dispatch]);

  useEffect(() => {
    if (permission?.granted === false) {
      safeBack();
    }
  }, [permission?.granted]);

  const onCameraReady = useCallback(() => {
    setIsCameraReady(true);
  }, []);

  return { isCameraReady, permission, onCameraReady };
}

const styles = StyleSheet.create({
  camera: {
    height: "100%",
  },

  overlay: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
  },

  container: {
    flex: 1,
    gap: 16,
    alignItems: "center",
  },
});
