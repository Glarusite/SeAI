import { Platform, StyleSheet, View } from "react-native";

export default function FormView({ children }: React.PropsWithChildren) {
  if (Platform.OS === "web") {
    return (
      <form>
        <View style={styles.container}>{children}</View>
      </form>
    );
  }

  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
