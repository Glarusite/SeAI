import { useAppNavigation } from "@src/common/hooks";
import AppStack from "@src/components/app/app-stack";
import { useAppSelector } from "@src/store";
import { Stack, router } from "expo-router";

export default function TrainingCenterLayout() {
  const role = useAppSelector(state => state.user.role) || "SEAFARER";

  useAppNavigation(() => {
    if (role === "SEAFARER") {
      router.push("/(auth)/(seafarer)/");
    }
  }, [role]);

  return (
    <AppStack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="course-management" options={{ title: "Course Management" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
    </AppStack>
  );
}
