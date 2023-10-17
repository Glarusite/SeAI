import { StyleSheet, View } from "react-native";

export default function NarrowView({ children }: React.PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    width: "100%",
    maxWidth: 480,
  },
});
