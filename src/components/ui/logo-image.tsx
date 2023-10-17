import { Image, ImageSource } from "expo-image";
import { StyleSheet } from "react-native";

import { TitleText } from "./title-text";

export interface LogoImageProps {
  title?: string;
}

export default function LogoImage({ title }: LogoImageProps) {
  return (
    <>
      <Image source={require("@assets/icon.png") as ImageSource} style={styles.image} />
      {title && (
        <TitleText fontSize={46} fontFamily="Impact">
          {title}
        </TitleText>
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
