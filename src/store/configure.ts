import AsyncStorage from "@react-native-async-storage/async-storage";
import type { StateFromReducersMapObject } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { safeJsonParse } from "@src/common/json";
import { debounce } from "lodash";

import { api } from "./api";
import { reducer } from "./reducer";

export async function configureAppStore() {
  const state = await AsyncStorage.getItem("state");
  const preloadedState = safeJsonParse<AppStoreState>(state);
  const store = configureStore({
    reducer,
    preloadedState,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware(), api.middleware],
  });

  store.subscribe(
    debounce(() => {
      const { api: _, ...storedState } = store.getState();
      void AsyncStorage.setItem("state", JSON.stringify(storedState));
    }, 50),
  );

  return store;
}

function configureTypedStore(preloadedState: AppStoreState | undefined) {
  return configureStore({
    reducer,
    preloadedState,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware(), api.middleware],
  });
}

export type AppStore = ReturnType<typeof configureTypedStore>;
export type AppStoreState = StateFromReducersMapObject<typeof reducer>;
