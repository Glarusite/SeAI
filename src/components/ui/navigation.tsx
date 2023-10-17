import { setUser, useAppDispatch } from "@src/store";
import { useCallback } from "react";
import { Button } from "react-native-paper";

import LinkButton from "./link-button";
import NarrowView from "./narrow-view";

export default function Navigation() {
  const { logout } = useNavigation();

  return (
    <NarrowView>
      <LinkButton href="/scanner/">Smart Scanner</LinkButton>
      <LinkButton href="/user/">Profile</LinkButton>
      <Button onPress={logout} mode="contained-tonal">
        Logout
      </Button>
    </NarrowView>
  );
}
function useNavigation() {
  const dispatch = useAppDispatch();
  const logout = useCallback(() => dispatch(setUser({})), [dispatch]);
  return { logout };
}
