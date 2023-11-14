import { safeBack } from "@src/common/router";
import { Stack } from "expo-router";
import { Platform, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import type { ScreenProps } from "react-native-screens";

import AppDrawerMenu from "./app-drawer-menu";

export default function AppStack({ children }: Pick<ScreenProps, "children">) {
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
                <View style={{ flexDirection: "row" }}>
                  <IconButton icon="arrow-left" onPress={safeBack} />
                  <AppDrawerMenu />
                </View>
              );
            }
          } else {
            return <AppDrawerMenu />;
          }
        },
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
