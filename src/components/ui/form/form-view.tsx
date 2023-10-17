import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

export default function FormView({ children }: React.PropsWithChildren) {
  if (Platform.OS === "web") {
    return (
      <form>
        <View style={styles.container}>{children}</View>
      </form>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
