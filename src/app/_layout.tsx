import { AppTheme, useAppTheme } from "@src/components/app/app-theme";
import AuthSlot from "@src/components/app/auth-slot";
import WebSplashScreen from "@src/components/ui/web-splash-screen";
import { useCreateStore } from "@src/store";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
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
          <View style={styles.container}>
            <AuthSlot />
            <StatusBar style="auto" />
          </View>
        </PaperProvider>
      </Provider>
    );
  }

  if (Platform.OS === "web") {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
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
        container: {
          flex: 1,
          gap: 16,
          padding: 16,
          alignItems: "center",
          backgroundColor: colors.background,
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
