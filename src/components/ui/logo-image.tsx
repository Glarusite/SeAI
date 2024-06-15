import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import PageTitle from "./page-title";

import logoDarkImageSource from "@assets/icon-dark.png";
import logoLightImageSource from "@assets/icon-light.png";

export interface LogoImageProps {
  title?: string;
}

export default function LogoImage({ title }: LogoImageProps) {
  const {
    dark,
    colors: { primary },
  } = useTheme();

  return (
    <>
      <Image source={dark ? logoDarkImageSource : logoLightImageSource} style={styles.image} />
      {title && (
        <PageTitle
          fontSize={46}
          fontFamily={Platform.OS === "android" ? undefined : "Impact"}
          color={dark ? "white" : primary}
        >
          {title}
        </PageTitle>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    alignSelf: "center",
  },
});
