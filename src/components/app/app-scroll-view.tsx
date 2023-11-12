import { useMemo } from "react";
import type { ViewProps, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface AppScrollViewProps {
  style?: ViewStyle;
  wide?: boolean;
}

export default function AppScrollView({ children, wide, style, ...viewProps }: AppScrollViewProps & ViewProps) {
  const styles = useStyles({ style, wide });
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container} {...viewProps}>
        {children}
      </View>
    </KeyboardAwareScrollView>
  );
}

function useStyles({ style, wide }: AppScrollViewProps) {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          gap: 16,
          padding: 16,
          width: "100%",
          maxWidth: wide ? 1280 : 480,
          alignSelf: "center",
          ...style,
        },
      }),
    [],
  );
}
