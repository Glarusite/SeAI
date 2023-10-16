import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateFromReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { debounce } from "lodash";

import { api } from "./api";
import { getAsyncStorageState } from "./async-storage";
import { reducer } from "./reducer";

export async function configureAppStore() {
  const preloadedState = await getAsyncStorageState();
  const store = configureTypedStore(preloadedState);

  store.subscribe(
    debounce(() => {
      const state = store.getState();
      void AsyncStorage.setItem("state", JSON.stringify(state));
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
