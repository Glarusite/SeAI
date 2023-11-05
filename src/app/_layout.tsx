import AppDrawer from "@src/components/app/app-drawer";
import { useAppTheme } from "@src/components/app/app-theme";
import AppThemeProvider from "@src/components/app/app-theme-provider";
import { useCreateStore } from "@src/store";
import { SplashScreen } from "expo-router";
import { unlockAsync } from "expo-screen-orientation";
import { setBackgroundColorAsync } from "expo-system-ui";
import React, { useEffect, useState } from "react";
import { AppState, Platform, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const { store, appTheme } = useAppLayout();

  if (store) {
    return (
      <Provider store={store}>
        <AppThemeProvider>
          <AppDrawer />
          <Toast />
        </AppThemeProvider>
      </Provider>
    );
  }

  if (Platform.OS === "web") {
    return (
      <PaperProvider theme={appTheme}>
        <View style={{ backgroundColor: appTheme.colors.background }}>
          <SplashScreen />
        </View>
      </PaperProvider>
    );
  }
}

function useAppLayout() {
  const store = useCreateStore();
  const { appTheme } = useAppTheme(store?.getState().app.colorScheme);
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

      void setBackgroundColorAsync(appTheme.colors.background);
    }
  }, [appState, appTheme.colors.background]);

  return { store, appTheme };
}
