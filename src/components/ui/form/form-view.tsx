import { Platform, StyleSheet, View } from "react-native";

export default function FormView({ children }: React.PropsWithChildren) {
  const formView = <View style={styles.container}>{children}</View>;

  if (Platform.OS !== "web") {
    return formView;
  }

  return <form>{formView}</form>;
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
