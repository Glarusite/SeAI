import { ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";

import { useAppTheme } from "./app-theme";

import { useAppSelector } from "@src/store";

export default function AppThemeProvider({ children }: React.PropsWithChildren) {
  const appColorScheme = useAppSelector(state => state.app.colorScheme);
  const { appTheme, navTheme } = useAppTheme(appColorScheme);

  useEffect(() => {
    void setBackgroundColorAsync(appTheme.colors.background);
  }, [appTheme.colors.background]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={appTheme}>
        <ThemeProvider value={navTheme}>
          {children}
          <StatusBar style={appTheme.dark ? "light" : "dark"} />
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
