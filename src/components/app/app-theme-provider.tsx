import { ThemeProvider } from "@react-navigation/native";
import { useAppSelector } from "@src/store";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";

import { useAppTheme } from "./app-theme";

export default function AppThemeProvider({ children }: React.PropsWithChildren) {
  const appColorScheme = useAppSelector(state => state.app.colorScheme);
  const { appTheme, navTheme } = useAppTheme(appColorScheme);

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
