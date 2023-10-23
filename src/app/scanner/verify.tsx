import { useNavigation } from "@src/common/hooks";
import { safeBack } from "@src/common/router";
import VerifyForm from "@src/components/scanner/verify-form";
import BackButton from "@src/components/ui/buttons/back-button";
import { TitleText } from "@src/components/ui/title-text";
import { useAppSelector } from "@src/store";
import { Image } from "expo-image";
import { type DimensionValue } from "react-native";
import { StyleSheet } from "react-native";

export default function Verify() {
  const uri = useAppSelector(state => state.scan.uri);

  useNavigation(() => {
    if (uri == null) {
      safeBack();
    }
  }, [uri]);

  return (
    <>
      <TitleText>Verify scanned data</TitleText>
      <Image source={uri} style={styles.image} contentFit="scale-down" />
      <VerifyForm />
      <BackButton />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "25vh" as DimensionValue,
  },
});
