import { useAppNavigation } from "@src/common/hooks";
import { useAppSelector } from "@src/store";
import { Slot, router, useSegments } from "expo-router";

export default function AuthorizedLayout() {
  const accessToken = useAppSelector(state => state.user.accessToken);
  const segments: string[] = useSegments();
  const { 0: group } = segments;
  const isRootGroup = segments.filter(segment => segment.startsWith("(")).length === 1;

  useAppNavigation(() => {
    if (!accessToken && group === "(auth)") {
      router.replace("/user/login");
    }
  }, [accessToken, group]);

  return <Slot />;
}
