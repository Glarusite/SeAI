import { useAppSelector } from "@src/store";
import { Slot, router, useSegments } from "expo-router";
import { useEffect } from "react";

export default function AuthSlot() {
  const accessToken = useAppSelector(state => state.user.accessToken);
  const segments: string[] = useSegments();

  useEffect(() => {
    if (accessToken) {
      if (segments.includes("user") && segments.length > 1) {
        router.replace("/");
      }
    } else {
      if (segments.every(segments => !allowedSegments.has(segments))) {
        router.replace("/user/login");
      }
    }
  }, [accessToken, segments]);

  return <Slot />;
}

const allowedSegments = new Set(["login", "register", "about"]);
