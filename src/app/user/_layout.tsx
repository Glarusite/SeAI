import NarrowView from "@src/components/ui/narrow-view";
import { Slot } from "expo-router";

export default function UserLayout() {
  return (
    <NarrowView>
      <Slot />
    </NarrowView>
  );
}
