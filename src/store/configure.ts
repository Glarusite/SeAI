import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateFromReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { safeJsonParse } from "@src/common/json";
import { debounce } from "lodash";

import { api } from "./api";
import { reducer } from "./reducer";

export async function configureAsyncStorageAppStore() {
  const state = await AsyncStorage.getItem("state");
  const preloadedState = safeJsonParse<AppState>(state);
  const store = configureAppStore(preloadedState);

  store.subscribe(
    debounce(() => {
      const state = store.getState();
      void AsyncStorage.setItem("state", JSON.stringify(state));
    }, 50),
  );

  return store;
}

function configureAppStore(preloadedState: AppState | undefined) {
  return configureStore({
    reducer,
    preloadedState,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware(), api.middleware],
  });
}

export type AppStore = ReturnType<typeof configureAppStore>;
export type AppState = StateFromReducersMapObject<typeof reducer>;
