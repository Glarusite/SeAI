import { Stack } from "expo-router";
import { Platform } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import type { ScreenProps } from "react-native-screens";

import BackButton from "../ui/buttons/back-button";
import DrawerMenu from "../ui/drawer-menu";

export default function AppStack({ children }: Pick<ScreenProps, "children">) {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            Platform.OS === "web" && (
              <BackButton mode="text">
                <Icon source="arrow-left" size={24} />
              </BackButton>
            )
          ) : (
            <DrawerMenu />
          ),
        headerBackVisible: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      {children}
    </Stack>
  );
}
