import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { useRootNavigation } from "expo-router";
import { useEffect, useState } from "react";

export function useAsync(effect: () => Promise<void>, deps: unknown[]) {
  useEffect(() => {
    void effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useNavigation(effect: () => MaybePromise<void>, deps: unknown[]) {
  const rootNavigation = useRootNavigation();
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const setIsReady = () => setIsNavigationReady(true);

  useEffect(() => {
    if (rootNavigation == null) {
      return;
    }

    rootNavigation.addListener("state", setIsReady);
    return () => rootNavigation.removeListener("state", setIsReady);
  }, [rootNavigation]);

  useEffect(() => {
    if (isNavigationReady) {
      void effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavigationReady, ...deps]);
}
