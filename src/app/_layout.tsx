import AppRootView from "@src/components/app/app-root-view";
import { useAppTheme } from "@src/components/app/app-theme";
import AuthSlot from "@src/components/app/auth-slot";
import WebSplashScreen from "@src/components/ui/web-splash-screen";
import { useCreateStore } from "@src/store";
import { SplashScreen } from "expo-router";
import { unlockAsync } from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { setBackgroundColorAsync } from "expo-system-ui";
import React, { useEffect, useState } from "react";
import { AppState, Platform, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const { store, theme } = useAppLayout();

  if (store) {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AppRootView>
              <AuthSlot />
              <StatusBar style="auto" />
            </AppRootView>
            <Toast />
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    );
  }

  if (Platform.OS === "web") {
    return (
      <PaperProvider theme={theme}>
        <View style={{ backgroundColor: theme.colors.background }}>
          <WebSplashScreen />
        </View>
      </PaperProvider>
    );
  }
}

function useAppLayout() {
  const store = useCreateStore();
  const theme = useAppTheme();
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    const appStateHandler = AppState.addEventListener("change", setAppState);
    return () => appStateHandler.remove();
  }, []);

  useEffect(() => {
    if (store) {
      SplashScreen.hideAsync();
    }
  }, [store]);

  useEffect(() => {
    if (appState === "active") {
      if (Platform.OS !== "web") {
        void unlockAsync();
      }

      void setBackgroundColorAsync(theme.colors.background);
    }
  }, [appState, theme.colors.background]);

  return { store, theme };
}
