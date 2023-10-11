import { AppState, AppStore, configureAsyncStorageAppStore } from "@src/store/configure";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

export function useCreateStore() {
  const [store, setStore] = useState<AppStore>();

  useEffect(() => {
    void configureAsyncStorageAppStore().then(setStore);
  }, []);

  return store;
}

export const useAppStore = useStore as () => AppStore;
export const useAppDispatch = useDispatch as () => AppStore["dispatch"];
export const useAppSelector = useSelector as TypedUseSelectorHook<AppState>;
