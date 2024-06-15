import { Stack } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import type { ScreenProps } from "react-native-screens";

import AppDrawerMenu from "./app-drawer-menu";

import { safeBack } from "@src/common/router";

export type AppStackProps = Pick<ScreenProps, "children"> & {
  headerShown?: boolean;
};

export default function AppStack({ children, headerShown }: AppStackProps) {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        gestureEnabled: false,
        headerBackVisible: true,
        headerLeft({ canGoBack }) {
          if (canGoBack) {
            if (Platform.OS === "web") {
              return (
                <View style={styles.buttonContainer}>
                  <IconButton icon="arrow-left" onPress={safeBack} />
                  <AppDrawerMenu />
                </View>
              );
            }
          } else {
            return <AppDrawerMenu />;
          }
        },
        headerShown,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {children}
    </Stack>
  );
}

const styles = StyleSheet.create({
  buttonContainer: { flexDirection: "row" },
});
