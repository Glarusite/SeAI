import logoImageSource from "@assets/icon.png";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { PageTitle } from "./page-title";

export interface LogoImageProps {
  title?: string;
}

export default function LogoImage({ title }: LogoImageProps) {
  return (
    <>
      <Image source={logoImageSource} style={styles.image} />
      {title && (
        <PageTitle fontSize={46} fontFamily="Impact">
          {title}
        </PageTitle>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 166,
    width: 190,
    alignSelf: "center",
  },
});
