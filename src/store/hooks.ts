import { useEffect, useState } from "react";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, AppStore, AppStoreState } from "./configure";
import { configureAppStore } from "./configure";

export function useCreateStore() {
  const [store, setStore] = useState<AppStore>();

  useEffect(() => {
    void configureAppStore().then(setStore);
  }, []);

  return store;
}

export const useAppDispatch = useDispatch as () => AppDispatch;
export const useAppSelector = useSelector as TypedUseSelectorHook<AppStoreState>;
