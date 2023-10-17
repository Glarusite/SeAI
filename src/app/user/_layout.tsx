import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function UserLayout() {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    width: "100%",
    maxWidth: 480,
  },
});
