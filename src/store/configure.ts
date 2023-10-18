import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateFromReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { safeJsonParse } from "@src/common/json";
import { debounce } from "lodash";

import { api } from "./api";
import { reducer } from "./reducer";
import { setAppValue } from "./slices/app";

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
      const { api: _, ...state } = store.getState();
      void AsyncStorage.setItem("state", JSON.stringify(state));
    }, 50),
  );

  store.dispatch(setAppValue({ name: "fullscreen", value: false }));

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
