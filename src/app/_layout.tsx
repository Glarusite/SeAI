import AppRootView from "@src/components/app/app-root-view";
import { useAppTheme } from "@src/components/app/app-theme";
import AuthSlot from "@src/components/app/auth-slot";
import WebSplashScreen from "@src/components/ui/web-splash-screen";
import { useCreateStore } from "@src/store";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const store = useCreateStoreEffect();
  const theme = useAppTheme();

  if (store) {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AppRootView>
              <AuthSlot />
              <Toast />
              <StatusBar style="auto" />
            </AppRootView>
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    );
  }

  if (Platform.OS === "web") {
    return (
      <PaperProvider theme={theme}>
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <WebSplashScreen />
        </View>
      </PaperProvider>
    );
  }
}

function useCreateStoreEffect() {
  const store = useCreateStore();

  useEffect(() => {
    if (store) {
      SplashScreen.hideAsync();
    }
  }, [store]);

  return store;
}
