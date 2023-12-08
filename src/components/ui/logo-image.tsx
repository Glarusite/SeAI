import logoImageSource from "@assets/icon.png";
import { Image } from "expo-image";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import { PageTitle } from "./page-title";

export interface LogoImageProps {
  title?: string;
}

export default function LogoImage({ title }: LogoImageProps) {
  const styles = useStyles();
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

function useStyles() {
  const { dark } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        image: {
          height: 150,
          width: 150,
          alignSelf: "center",
          filter: dark ? undefined : "invert(1)",
        },
      }),
    [dark],
  );
}
