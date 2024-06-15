import { Orientation } from "expo-screen-orientation";
import type { PropsWithChildren } from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppOrientation } from "@src/common/hooks";

export default function AppSafeAreaView({ children }: PropsWithChildren) {
  const orientation = useAppOrientation();

  if (
    Platform.OS !== "web" &&
    (orientation === Orientation.LANDSCAPE_LEFT || orientation === Orientation.LANDSCAPE_RIGHT)
  ) {
    return <SafeAreaView>{children}</SafeAreaView>;
  }

  return children;
}
