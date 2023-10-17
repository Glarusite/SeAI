import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import LogoImage from "./logo-image";

export default function WebSplashScreen() {
  return (
    <>
      <View style={styles.logoContainer}>
        <LogoImage />
      </View>
      <ActivityIndicator style={styles.spinner} size={240} />
    </>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  spinner: {
    flex: 1,
  },
});
