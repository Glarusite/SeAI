import { Tabs } from "expo-router";
import type { ScreenProps } from "react-native-screens";

import AppDrawerMenu from "./app-drawer-menu";

export default function AppTabs({ children }: Pick<ScreenProps, "children">) {
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <AppDrawerMenu />,
        headerTitleAlign: "center",
        tabBarStyle: { bottom: 2 },
        unmountOnBlur: true,
        lazy: true,
      }}
    >
      {children}
    </Tabs>
  );
}
