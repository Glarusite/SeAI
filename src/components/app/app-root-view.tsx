import { useAppSelector } from "@src/store";
import { useMemo } from "react";
import { Keyboard, Platform, Pressable, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppRootView({ children }: React.PropsWithChildren) {
  const { fullscreen, styles } = useAppRootView();

  if (fullscreen || Platform.OS === "web") {
    return <View style={styles.container}>{children}</View>;
  }

  return (
    <KeyboardAwareScrollView>
      <Pressable onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}

function useAppRootView() {
  const { colors } = useTheme();

  const fullscreen = useAppSelector(state => state.app.fullscreen);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          gap: 16,
          [Platform.OS === "web" ? "padding" : "paddingHorizontal"]: fullscreen ? undefined : 16,
          backgroundColor: colors.background,
          alignItems: "center",
        },
      }),
    [colors.background, fullscreen],
  );

  return { fullscreen, styles };
}
