import AppDrawer from "@src/components/app/app-drawer";
import AppThemeProvider from "@src/components/app/app-theme-provider";
import { useCreateStore } from "@src/store";
import { unlockAsync } from "expo-screen-orientation";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

void preventAutoHideAsync();

export default function AppLayout() {
  const { store } = useAppLayout();

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
}

function useAppLayout() {
  const store = useCreateStore();
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const appStateHandler = AppState.addEventListener("change", setAppState);
    return () => appStateHandler.remove();
  }, []);

  useEffect(() => {
    if (store) {
      void hideAsync();
    }
  }, [store]);

  useEffect(() => {
    if (appState === "active" && Platform.OS !== "web") {
      void unlockAsync();
    }
  }, [appState]);

  // disable scrolling on web
  useEffect(() => {
    if (Platform.OS === "web") {
      // eslint-disable-next-line no-eval
      eval(`document.body.style.overflow = "hidden"`);
    }
  }, []);

  return { store };
}
