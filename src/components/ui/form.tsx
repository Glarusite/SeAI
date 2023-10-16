import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

const Form: React.FC<React.PropsWithChildren> = ({ children }) => {
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
};

export default Form;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
