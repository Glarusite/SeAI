import { useAppSelector } from "@src/hooks/store";
import { Slot, router, useSegments } from "expo-router";
import { useEffect } from "react";

const AuthSlot: React.FC = () => {
  const accessToken = useAppSelector(state => state.user.accessToken);
  const segments: string[] = useSegments();

  useEffect(() => {
    if (accessToken && segments.includes("user") && segments.length > 1) {
      router.replace("/");
    } else if (accessToken == null && !segments.some(segments => allowedSegments.has(segments))) {
      router.replace("/user/login");
    }
  }, [accessToken, segments]);

  return <Slot />;
};

export default AuthSlot;

const allowedSegments = new Set(["login", "register", "about"]);
