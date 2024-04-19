import AsyncStorage from "@react-native-async-storage/async-storage";
import type { EnhancedStore, StateFromReducersMapObject } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { toDate } from "@src/common/date";
import { safeJsonParse } from "@src/common/json";
import { debounce } from "lodash";

import { api } from "./api";
import { reducer } from "./reducer";

export async function configureAppStore() {
  const state = await AsyncStorage.getItem("state");
  const preloadedState = safeJsonParse<AppStoreState>(state, isoDateReviver);
  const store = configureStore({
    reducer,
    preloadedState,
    // TODO: Check why type error occurs when using spread operator
    // eslint-disable-next-line unicorn/prefer-spread
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  });

  store.subscribe(
    debounce(() => {
      const { api: _, ...storedState } = store.getState();
      void AsyncStorage.setItem("state", JSON.stringify(storedState));
    }, 50),
  );

  return store;
}

export type AppStore = EnhancedStore;
export type AppDispatch = AppStore["dispatch"];
export type AppStoreState = StateFromReducersMapObject<typeof reducer>;

function isoDateReviver(_key: string, value: unknown) {
  if (typeof value === "string" && isoDateRegex.test(value)) {
    return toDate(value);
  }

  return value;
}

const isoDateRegex = /[+-]?\d{4,6}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:[+-][0-2]\d:[0-5]\d|Z)?/;
