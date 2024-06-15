import { Slot, router, useSegments } from "expo-router";

import { useAppNavigation } from "@src/common/hooks";
import { useAppSelector } from "@src/store";

export default function AuthorizedLayout() {
  const accessToken = useAppSelector(state => state.user.accessToken);
  const segments: string[] = useSegments();
  const { 0: group } = segments;

  useAppNavigation(() => {
    if (!accessToken && group === "(auth)") {
      router.push("/user/login");
    }
  }, [accessToken, group]);

  return <Slot />;
}
