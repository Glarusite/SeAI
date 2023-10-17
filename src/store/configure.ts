import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateFromReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { debounce } from "lodash";

import { api } from "./api";
import { getAsyncStorageState } from "./async-storage";
import { reducer } from "./reducer";
import { setAppValue } from "./slices/app";

export async function configureAppStore() {
  const preloadedState = await getAsyncStorageState();
  const store = configureTypedStore(preloadedState);

  await new Promise(resolve => setTimeout(resolve, 10_000));

  store.subscribe(
    debounce(() => {
      const state = store.getState();
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
