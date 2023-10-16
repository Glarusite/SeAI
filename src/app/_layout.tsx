import { AppTheme, useAppTheme } from "@src/components/app/app-theme";
import AuthSlot from "@src/components/app/auth-slot";
import WebSplashScreen from "@src/components/ui/web-splash-screen";
import { useCreateStore } from "@src/store";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo } from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

const AppLayout: React.FC = () => {
  const store = useCreateStoreEffect();
  const theme = useAppTheme();
  const styles = useStyles(theme);

  if (store) {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaView style={styles.rootContainer}>
            <View style={styles.container}>
              <AuthSlot />
              <Toast />
              <StatusBar style="auto" />
            </View>
          </SafeAreaView>
        </PaperProvider>
      </Provider>
    );
  }

  if (Platform.OS === "web") {
    return (
      <PaperProvider theme={theme}>
        <View style={{ ...styles.rootContainer }}>
          <WebSplashScreen />
        </View>
      </PaperProvider>
    );
  }
};

export default AppLayout;

function useStyles({ colors }: AppTheme) {
  return useMemo(
    () =>
      StyleSheet.create({
        rootContainer: {
          flex: 1,
          backgroundColor: colors.background,
        },

        container: {
          flex: 1,
          gap: 16,
          paddingHorizontal: 16,
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
