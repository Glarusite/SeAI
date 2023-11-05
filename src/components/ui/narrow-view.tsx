import { StyleSheet, View } from "react-native";

export default function NarrowView({ children }: React.PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
});
