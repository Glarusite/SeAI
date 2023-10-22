import { safeBack } from "@src/common/router";
import ReviewForm from "@src/components/scanner/review-form";
import BackButton from "@src/components/ui/buttons/back-button";
import { TitleText } from "@src/components/ui/title-text";
import { useAppSelector } from "@src/store";
import { Image } from "expo-image";
import { useRootNavigation } from "expo-router";
import { useEffect } from "react";

export default function Review() {
  const scan = useAppSelector(state => state.scan);
  const rootNavigation = useRootNavigation();

  useEffect(() => {
    if (rootNavigation?.isReady() && scan.id == null) {
      safeBack();
    }
  });

  return (
    <>
      <TitleText>Review scanned data</TitleText>
      <Image source={scan.uri} />
      <ReviewForm />
      <BackButton />
    </>
  );
}
