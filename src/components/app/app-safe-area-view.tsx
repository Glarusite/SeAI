import { useAppOrientation } from "@src/common/hooks";
import { Orientation } from "expo-screen-orientation";
import type { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppSafeAreaView({ children }: PropsWithChildren) {
  const orientation = useAppOrientation();

  if (orientation === Orientation.LANDSCAPE_LEFT || orientation === Orientation.LANDSCAPE_RIGHT) {
    return <SafeAreaView>{children}</SafeAreaView>;
  }

  return children;
}
