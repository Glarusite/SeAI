import { safeBack } from "@src/common/router";
import BackButton from "@src/components/ui/buttons/back-button";
import { setAppValue, setUser, useAppDispatch, useAppSelector } from "@src/store";
import { getAsyncStorageState } from "@src/store/async-storage";
import { Camera, CameraType } from "expo-camera";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Icon } from "react-native-paper";

export default function UseCamera() {
  const { cameraRef, isCameraReady, permission, onCameraReady, takePicture } = useFullScreenCamera();

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
            <Button onPress={takePicture} mode="contained" disabled={!isCameraReady}>
              <Icon source="camera" size={16} />
            </Button>
            <BackButton mode="elevated" />
          </View>
        </SafeAreaView>
      </Camera>
    </>
  );
}

function useFullScreenCamera() {
  const dispatch = useAppDispatch();
  const cameraRef = useRef<Camera>(null);
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

  const userId = useAppSelector(state => state.user.userId);

  const takePicture = useCallback(async () => {
    const state = await getAsyncStorageState();
    if (cameraRef.current != null && userId != null && state != null) {
      try {
        setIsCameraReady(false);
        const { uri } = await cameraRef.current.takePictureAsync({ quality: 0.1 });
        cameraRef.current.pausePreview();
        const formData = new FormData();
        const name = uri.split("/").pop();
        formData.append("file", {
          uri,
          type: "image/jpeg",
          name,
        });

        const response = await fetch(
          `http://ec2-18-194-242-209.eu-central-1.compute.amazonaws.com:8080/api/v1/users/${userId}/ocr`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${state.user.accessToken}`,
            },
            body: formData,
          },
        );

        if (response.status === 403) {
          dispatch(setUser({}));
        }

        console.log(response.status, await response.text());
      } catch (error) {
        console.error(JSON.stringify(error));
      } finally {
        cameraRef.current.resumePreview();
        setIsCameraReady(true);
      }
    }
  }, [dispatch, userId]);

  return { cameraRef, isCameraReady, permission, onCameraReady, takePicture };
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
