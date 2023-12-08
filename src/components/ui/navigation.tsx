import { setUser, useAppDispatch } from "@src/store";
import { router } from "expo-router";
import { useCallback } from "react";
import { Button } from "react-native-paper";

import LinkButton from "./buttons/link-button";

export default function Navigation() {
  const logout = useLogout();

  return (
    <>
      <LinkButton href="/scanner/" mode="contained">
        Smart Scanner
      </LinkButton>
      <LinkButton href="/documents/" mode="contained-tonal">
        Documents
      </LinkButton>
      <LinkButton href="/user/" mode="contained-tonal">
        Profile
      </LinkButton>
      <LinkButton href="/(auth)/" mode="contained-tonal">
        Chat
      </LinkButton>
      <LinkButton href="/(auth)/" mode="contained-tonal">
        Booking
      </LinkButton>
      <LinkButton href="/(auth)/" mode="contained-tonal">
        Events
      </LinkButton>
      <LinkButton href="/(auth)/" mode="contained-tonal">
        Maritime Administration
      </LinkButton>
      <LinkButton href="/(auth)/" mode="contained-tonal">
        Information
      </LinkButton>

      <Button onPress={logout} mode="outlined">
        Logout
      </Button>
    </>
  );
}

function useLogout() {
  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(setUser({}));
    router.replace("/user/login");
  }, [dispatch]);
  return logout;
}
