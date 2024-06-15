import { useCallback } from "react";
import { Appearance, Platform, StyleSheet, View, useColorScheme } from "react-native";
import { Icon, Switch, Text } from "react-native-paper";

import { setAppValue, useAppDispatch, useAppSelector } from "@src/store";

export default function ToggleThemeSwitch() {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const appColorScheme = useAppSelector(state => state.app.colorScheme) || colorScheme;

  const toggleTheme = useCallback(() => {
    if (Platform.OS !== "web") {
      Appearance.setColorScheme(appColorScheme === "dark" ? "light" : "dark");
    }

    dispatch(setAppValue({ name: "colorScheme", value: appColorScheme === "dark" ? "light" : "dark" }));
  }, [appColorScheme, dispatch]);

  const labelText = appColorScheme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <View style={styles.container}>
      <Icon source="theme-light-dark" size={20} />
      <Text>{labelText}</Text>
      <Switch style={styles.switch} value={appColorScheme === "dark"} onValueChange={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  switch: {
    marginStart: "auto",
  },
});
