import AuthSlot from "@src/components/auth-slot";
import { useCreateStore } from "@src/hooks/store";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

const AppLayout: React.FC = () => {
  const store = useCreateStoreEffect();

  if (store) {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AuthSlot />
          <StatusBar style="auto" />
        </View>
      </Provider>
    );
  }
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function useCreateStoreEffect() {
  const store = useCreateStore();

  useEffect(() => {
    if (store) {
      SplashScreen.hideAsync();
    }
  });

  return store;
}
