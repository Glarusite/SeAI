import { AppTheme, useAppTheme } from "@src/components/app/app-theme";
import AuthSlot from "@src/components/app/auth-slot";
import WebSplashScreen from "@src/components/ui/web-splash-screen";
import { useCreateStore } from "@src/store";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo } from "react";
import { Platform, StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const store = useCreateStoreEffect();
  const theme = useAppTheme();
  const styles = useStyles(theme);

  if (store) {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
              <AuthSlot />
              <Toast />
              <StatusBar style="auto" />
            </SafeAreaView>
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    );
  }

  if (Platform.OS === "web") {
    return (
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <SafeAreaView style={{ ...styles.container }}>
            <WebSplashScreen />
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}

function useStyles({ colors }: AppTheme) {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          gap: 16,
          [Platform.OS === "web" ? "padding" : "paddingHorizontal"]: 16,
          backgroundColor: colors.background,
          alignItems: "center",
        },
      }),
    [colors],
  );
}

function useCreateStoreEffect() {
  const store = useCreateStore();

  useEffect(() => {
    if (store) {
      SplashScreen.hideAsync();
    }
  });

  return store;
}
