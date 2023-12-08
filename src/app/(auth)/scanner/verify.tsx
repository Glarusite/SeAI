import { useAppDimensions, useAppNavigation } from "@src/common/hooks";
import { safeBack } from "@src/common/router";
import AppScrollView from "@src/components/app/app-scroll-view";
import VerifyForm from "@src/components/scanner/verify-form";
import { useAppSelector } from "@src/store";
import { Image } from "expo-image";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export default function VerifyPage() {
  const uri = useAppSelector(state => state.scan.uri);
  const styles = useStyles();

  useAppNavigation(() => {
    if (uri == null) {
      safeBack();
    }
  }, [uri]);

  return (
    <AppScrollView>
      <Image source={uri} style={styles.image} contentFit="contain" />
      <VerifyForm />
    </AppScrollView>
  );
}

function useStyles() {
  const { height } = useAppDimensions();

  return useMemo(
    () =>
      StyleSheet.create({
        image: { height: height / 3 },
      }),
    [height],
  );
}
