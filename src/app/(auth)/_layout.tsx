import { useAppNavigation } from "@src/common/hooks";
import AppStack from "@src/components/app/app-stack";
import { useAppSelector } from "@src/store";
import { Stack, router, useSegments } from "expo-router";

export default function AuthorizedLayout() {
  const accessToken = useAppSelector(state => state.user.accessToken);
  const { 0: group }: string[] = useSegments();

  useAppNavigation(() => {
    if (!accessToken && group === "(auth)") {
      router.replace("/user/login");
    }
  }, [accessToken, group]);

  return (
    <AppStack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="documents/[id]" options={{ title: "Document Review" }} />
      <Stack.Screen name="documents/index" options={{ title: "Documents" }} />
      <Stack.Screen name="scanner/index" options={{ title: "Scanner" }} />
      <Stack.Screen name="scanner/camera" options={{ title: "Scan with camera" }} />
      <Stack.Screen name="scanner/verify" options={{ title: "Verify" }} />
      <Stack.Screen name="user/index" options={{ title: "Profile" }} />
      <Stack.Screen name="voyages/[id]" options={{ title: "Voyage Review" }} />
      <Stack.Screen name="voyages/index" options={{ title: "Voyages" }} />
      <Stack.Screen name="voyages/new" options={{ title: "New Voyage" }} />
    </AppStack>
  );
}
