import { useAppSelector } from "@src/hooks/store";
import { Slot, router, useSegments } from "expo-router";
import { useEffect } from "react";

const AuthSlot: React.FC = () => {
  const user = useAppSelector(state => state.user);
  const segments: string[] = useSegments();

  useEffect(() => {
    if (user.id && segments.includes("user") && segments.length > 1) {
      router.replace("/");
    } else if (user.id == null && !segments.some(segments => allowedSegments.has(segments))) {
      router.replace("/user/login");
    }
  }, [user.id, segments]);

  return <Slot />;
};

export default AuthSlot;

const allowedSegments = new Set(["login", "register", "about"]);
