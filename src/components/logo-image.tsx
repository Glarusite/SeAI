import { Image, ImageSource } from "expo-image";
import { StyleSheet } from "react-native";

const LogoImage: React.FC = () => <Image source={require("@assets/icon.png") as ImageSource} style={styles.image} />;

export default LogoImage;

const styles = StyleSheet.create({
  image: {
    height: 166,
    width: 190,
    alignSelf: "center",
  },
});
