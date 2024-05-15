import { safeBack } from "@src/common/router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import type { ButtonProps } from "react-native-paper";
import { ActivityIndicator, IconButton } from "react-native-paper";

export interface FullScreenCameraProps {
  isLoading?: boolean;
  onTakePicture: ButtonProps["onPress"];
}

const FullScreenCamera = forwardRef<CameraView, FullScreenCameraProps>(function FullScreenCamera(
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
      <CameraView style={styles.camera} ref={cameraRef} facing="back" onCameraReady={onCameraReady}>
        <SafeAreaView style={styles.overlay}>
          <View style={styles.container}>
            {isLoading ? (
              <ActivityIndicator size={40} />
            ) : (
              <IconButton icon="camera" onPress={onTakePicture} mode="contained" disabled={!isCameraReady} size={40} />
            )}
          </View>
        </SafeAreaView>
      </CameraView>
    </>
  );
});

export default FullScreenCamera;

function useFullScreenCamera() {
  const [permission] = useCameraPermissions({ request: true });
  const [isCameraReady, setIsCameraReady] = useState(false);

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
