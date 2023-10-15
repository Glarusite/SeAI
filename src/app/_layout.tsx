import AuthSlot from "@src/components/auth-slot";
import LogoImage from "@src/components/logo-image";
import { useCreateStore } from "@src/hooks/store";
import { useAppTheme } from "@src/hooks/theme";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { ActivityIndicator, MD3Theme, PaperProvider } from "react-native-paper";
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
          <View style={styles.logoWrapper}>
            <LogoImage />
          </View>
          <ActivityIndicator style={styles.spinner} size={200} />
        </View>
      </PaperProvider>
    );
  }
};

export default AppLayout;

function useStyles({ colors }: MD3Theme) {
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

        logoWrapper: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },

        spinner: {
          flex: 1,
          alignSelf: "center",
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
