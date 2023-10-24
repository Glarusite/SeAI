import { useDimensions } from "@src/common/hooks";
import { useAppSelector } from "@src/store";
import { useMemo } from "react";
import { Keyboard, Platform, Pressable, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppRootView({ children }: React.PropsWithChildren) {
  const { fullscreen, styles } = useAppRootView();

  if (fullscreen || Platform.OS === "web") {
    return (
      <View style={styles.scrollContainer}>
        <View style={styles.container}>{children}</View>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView style={styles.scrollContainer}>
      <Pressable onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}

function useAppRootView() {
  const { colors } = useTheme();
  const { height } = useDimensions();
  const fullscreen = useAppSelector(state => state.app.fullscreen);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        scrollContainer: {
          height,
          overflowY: "auto",
        },

        container: {
          gap: 16,
          padding: fullscreen ? undefined : 16,
          backgroundColor: colors.background,
          alignItems: "center",
        },
      }),
    [colors.background, fullscreen, height],
  );

  return { fullscreen, styles };
}
