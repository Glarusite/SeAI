import CameraLinkButton from "@src/components/scanner/camera-button";
import BackButton from "@src/components/ui/buttons/back-button";
import LinkButton from "@src/components/ui/buttons/link-button";
import LogoImage from "@src/components/ui/logo-image";
import { TitleText } from "@src/components/ui/title-text";

export default function Scanner() {
  return (
    <>
      <LogoImage />
      <TitleText>Smart scanner™</TitleText>
      <CameraLinkButton href="/scanner/use-camera" mode="contained">
        {(isCameraAvailable, isCameraChecking) =>
          isCameraAvailable ? "Use camera" : isCameraChecking ? "Checking camera availability" : "Camera not available"
        }
      </CameraLinkButton>
      <LinkButton href="/scanner/use-photo" mode="contained-tonal">
        Upload saved photo
      </LinkButton>
      <LinkButton href="/scanner/" mode="contained-tonal">
        Upload saved PDF
      </LinkButton>
      <BackButton />
    </>
  );
}
