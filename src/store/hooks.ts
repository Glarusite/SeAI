import { useEffect, useState } from "react";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector, useStore } from "react-redux";

import type { AppStore, AppStoreState } from "./configure";
import { configureAppStore } from "./configure";

export function useCreateStore() {
  const [store, setStore] = useState<AppStore>();

  useEffect(() => {
    void configureAppStore().then(setStore);
  }, []);

  return store;
}

export const useAppStore = useStore as () => AppStore;
export const useAppDispatch = useDispatch as () => AppStore["dispatch"];
export const useAppSelector = useSelector as TypedUseSelectorHook<AppStoreState>;
