import { setUser, useAppDispatch } from "@src/store";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import LinkButton from "./link-button";

export default function Navigation() {
  const { logout } = useNavigation();

  return (
    <View style={styles.container}>
      <LinkButton href="/scanner/">Smart Scanner</LinkButton>
      <LinkButton href="/user/">Profile</LinkButton>
      <Button onPress={logout} mode="contained-tonal">
        Logout
      </Button>
    </View>
  );
}
function useNavigation() {
  const dispatch = useAppDispatch();
  const logout = useCallback(() => dispatch(setUser({})), [dispatch]);
  return { logout };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    width: "100%",
    maxWidth: 480,
  },
});
