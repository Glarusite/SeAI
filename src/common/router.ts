import { router } from "expo-router";

export function safeBack() {
  // If canGoBack and back are not available we need to run expo build to generate router types
  if (router.canGoBack()) {
    router.back();
  } else {
    router.push("/");
  }
}
