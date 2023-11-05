import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import LogoImage from "./logo-image";
import NarrowView from "./narrow-view";

export default function WebSplashScreen() {
  return (
    <NarrowView>
      <View style={styles.logoContainer}>
        <LogoImage />
      </View>
      <ActivityIndicator style={styles.spinner} size={240} />
    </NarrowView>
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
