import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

import { AppStore, AppStoreState, configureAppStore } from "./configure";

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
