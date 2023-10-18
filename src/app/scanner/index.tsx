import CameraLinkButton from "@src/components/scanner/camera-button";
import PhotoUploadButton from "@src/components/scanner/photo-upload-button";
import BackButton from "@src/components/ui/buttons/back-button";
import ButtonActivityIndicator from "@src/components/ui/buttons/button-activity-indicator";
import LogoImage from "@src/components/ui/logo-image";
import { TitleText } from "@src/components/ui/title-text";
import { useHandleFileUploadMutation } from "@src/store";

export default function Scanner() {
  const isLoading = useScannerIsLoading();

  return (
    <>
      <LogoImage />
      <TitleText>Smart scanner™</TitleText>
      <CameraLinkButton href="/scanner/use-camera" mode="contained" disabled={isLoading}>
        {(isCameraAvailable, isCameraChecking) =>
          isCameraAvailable ? (
            <>Use camera</>
          ) : isCameraChecking ? (
            <>
              <ButtonActivityIndicator />
              Checking camera availability
            </>
          ) : (
            <>Camera unavailable</>
          )
        }
      </CameraLinkButton>

      <PhotoUploadButton mode="contained-tonal" disabled={isLoading}>
        Upload saved photo
      </PhotoUploadButton>

      <BackButton />
    </>
  );
}

function useScannerIsLoading() {
  const [, { isLoading }] = useHandleFileUploadMutation({ fixedCacheKey: "imageUpload" });
  return isLoading;
}