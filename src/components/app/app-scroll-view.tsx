import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AppScrollView({ children }: React.PropsWithChildren) {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>{children}</View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },
});
