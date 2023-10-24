import { useNavigation } from "@src/common/hooks";
import { safeBack } from "@src/common/router";
import VerifyForm from "@src/components/scanner/verify-form";
import BackButton from "@src/components/ui/buttons/back-button";
import { TitleText } from "@src/components/ui/title-text";
import { useAppSelector } from "@src/store";
import { Image } from "expo-image";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

export default function Verify() {
  const uri = useAppSelector(state => state.scan.uri);
  const styles = useStyles();

  useNavigation(() => {
    if (uri == null) {
      safeBack();
    }
  }, [uri]);

  return (
    <>
      <TitleText>Verify scanned data</TitleText>
      <Image source={uri} style={styles.image} contentFit="contain" />
      <VerifyForm />
      <BackButton />
    </>
  );
}

function useStyles() {
  const [height, setHeight] = useState(getScreenHeight);
  useEffect(() => {
    const dimensionsHandler = Dimensions.addEventListener("change", () => setHeight(getScreenHeight));
    return () => dimensionsHandler.remove();
  }, []);

  return useMemo(
    () =>
      StyleSheet.create({
        image: { height: height * 0.4 },
      }),
    [height],
  );
}

function getScreenHeight() {
  return Dimensions.get("screen").height;
}
