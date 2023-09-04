import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateFromReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { safeJsonParse } from "@src/common/json";
import flags from "@src/slices/flags-slice";
import user from "@src/slices/user-slice";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

export function useCreateStore() {
  const [store, setStore] = useState<AppStore>();

  useEffect(() => {
    void createAsyncStorageStore().then(setStore);
  }, []);

  return store;
}

export const useAppStore = useStore as () => AppStore;
export const useAppDispatch = useDispatch as () => AppStore["dispatch"];
export const useAppSelector = useSelector as TypedUseSelectorHook<AppState>;

async function createAsyncStorageStore() {
  const state = await AsyncStorage.getItem("state");
  const preloadedState = safeJsonParse<AppState>(state);

  const store = createStore(preloadedState);

  store.subscribe(
    debounce(() => {
      const state = store.getState();
      void AsyncStorage.setItem("state", JSON.stringify(state));
    }, 500),
  );

  return store;
}

function createStore(preloadedState: AppState | undefined) {
  return configureStore({
    reducer,
    preloadedState,
  });
}

const reducer = {
  user,
  flags,
};

type AppStore = ReturnType<typeof createStore>;
type AppState = StateFromReducersMapObject<typeof reducer>;
