import { Stack } from "expo-router";
import { Platform } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import type { ScreenProps } from "react-native-screens";

import BackButton from "../ui/buttons/back-button";

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
                <BackButton mode="text">
                  <Icon source="arrow-left" size={24} />
                </BackButton>
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
