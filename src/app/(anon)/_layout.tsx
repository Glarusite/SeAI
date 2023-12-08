import { useAppNavigation } from "@src/common/hooks";
import AppTabs from "@src/components/app/app-tabs";
import { useAppSelector } from "@src/store";
import { Tabs, router, useSegments } from "expo-router";
import { Icon } from "react-native-paper";

export default function AnonymousLayout() {
  const accessToken = useAppSelector(state => state.user.accessToken);
  const { 0: group } = useSegments();

  useAppNavigation(() => {
    if (accessToken && group === "(anon)") {
      router.replace("/(auth)/");
    }
  }, [accessToken, group]);

  return (
    <AppTabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "SeAI",
          href: null,
        }}
      />
      <Tabs.Screen
        name="user/login"
        options={{
          tabBarIcon: () => <Icon source="login" size={20} />,
          title: "Login",
        }}
      />
      <Tabs.Screen
        name="user/registration"
        options={{
          tabBarIcon: () => <Icon source="account-plus" size={20} />,
          title: "Registration",
        }}
      />
      <Tabs.Screen
        name="user/reset-password"
        options={{
          href: null,
          title: "Reset Password",
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: () => <Icon source="information" size={20} />,
          title: "About",
        }}
      />
    </AppTabs>
  );
}
