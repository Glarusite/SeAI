import { useAppSelector } from "@src/store";
import { useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppRootView({ children }: React.PropsWithChildren) {
  const { fullscreen, styles } = useAppRootView();

  if (fullscreen || Platform.OS === "web") {
    return <View style={styles.container}>{children}</View>;
  }

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

function useAppRootView() {
  const {
    colors: { background },
  } = useTheme();

  const fullscreen = useAppSelector(state => state.app.fullscreen);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          gap: 16,
          [Platform.OS === "web" ? "padding" : "paddingHorizontal"]: fullscreen ? undefined : 16,
          backgroundColor: background,
          alignItems: "center",
        },
      }),
    [background, fullscreen],
  );

  return { fullscreen, styles };
}
