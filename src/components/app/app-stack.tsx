import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import type { ScreenProps } from "react-native-screens";

import DrawerMenu from "../ui/drawer-menu";

export default function AppStack({ children }: Pick<ScreenProps, "children">) {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerLeft: ({ canGoBack }) => !canGoBack && <DrawerMenu />,
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
