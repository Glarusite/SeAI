import AuthSlot from "@src/components/auth-slot";
import { useCreateStore } from "@src/hooks/store";
import { useAppTheme } from "@src/hooks/theme";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { MD3Theme, PaperProvider } from "react-native-paper";
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
};

export default AppLayout;

function useStyles({ colors }: MD3Theme) {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          gap: 16,
          alignItems: "center",
          justifyContent: "center",
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
