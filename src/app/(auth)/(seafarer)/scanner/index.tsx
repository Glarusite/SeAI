import { useAppNavigation } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import CameraLinkButton from "@src/components/scanner/camera-button";
import PhotoUploadButton from "@src/components/scanner/photo-upload-button";
import LogoImage from "@src/components/ui/logo-image";
import { PageTitle } from "@src/components/ui/page-title";
import { useAppSelector, useHandleFileUploadMutation } from "@src/store";
import { router } from "expo-router";

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
    if (Object.keys(scan).length > 0) {
      router.replace("/scanner/verify");
    }
  }, [scan]);

  const [, { isLoading }] = useHandleFileUploadMutation({ fixedCacheKey: "imageUpload" });
  return { isLoading };
}
