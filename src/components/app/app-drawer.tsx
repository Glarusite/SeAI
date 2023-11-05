import { useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { SafeAreaView } from "react-native";

import Navigation from "../ui/navigation";
import { PageTitle } from "../ui/page-title";
import ToggleThemeSwitch from "../ui/toggle-theme-switch";

import AppScrollView from "./app-scroll-view";

export default function AppDrawer() {
  const { 0: group, 1: page } = useSegments();
  return (
    <Drawer
      drawerContent={() => (
        <SafeAreaView>
          <AppScrollView>
            <PageTitle>SeAI Menu</PageTitle>
            {group === "(auth)" && page != null && <Navigation />}
            <ToggleThemeSwitch />
          </AppScrollView>
        </SafeAreaView>
      )}
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
