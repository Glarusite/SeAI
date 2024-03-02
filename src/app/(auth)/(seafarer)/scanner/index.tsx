import { useAppNavigation } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import CameraLinkButton from "@src/components/scanner/camera-button";
import PhotoUploadButton from "@src/components/scanner/photo-upload-button";
import LogoImage from "@src/components/ui/logo-image";
import PageTitle from "@src/components/ui/page-title";
import { useAppSelector, useUploadMutation } from "@src/store";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function ScannerPage() {
  const { isLoading } = useScanner();

  return (
    <AppScrollView>
      <LogoImage />
      <PageTitle>Smart scanner™</PageTitle>
      <CameraLinkButton href="/scanner/camera" mode="contained" disabled={isLoading}>
        {isCameraChecking => (isCameraChecking ? <>Checking camera availability</> : <>Use camera</>)}
      </CameraLinkButton>

      <PhotoUploadButton mode="contained-tonal" disabled={isLoading}>
        Upload photo
      </PhotoUploadButton>
    </AppScrollView>
  );
}

function useScanner() {
  const scan = useAppSelector(state => state.scan);

  useAppNavigation(() => {
    const { id, uri } = scan;
    if (id != null) {
      Toast.show({
        type: "info",
        text1: "Verify scanned document",
        text2: "Please verify or discard the scanned document",
      });
      router.push(`/documents/${id}`);
    } else if (uri) {
      router.push(`/documents/new`);
    }
  }, [scan]);

  const [, { isLoading }] = useUploadMutation({ fixedCacheKey: "imageUpload" });
  return { isLoading };
}
