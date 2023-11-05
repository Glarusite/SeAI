import type { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { useRootNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export function useAsync(effect: () => Promise<void>, deps: unknown[]) {
  useEffect(() => {
    void effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useAppNavigation(effect: () => MaybePromise<void>, deps: unknown[]) {
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

export function useDimensions(dimension: "screen" | "window" = "window") {
  const [dimensions, setDimensions] = useState(Dimensions.get(dimension));
  useEffect(() => {
    const dimensionsHandler = Dimensions.addEventListener("change", () => setDimensions(Dimensions.get(dimension)));
    return () => dimensionsHandler.remove();
  }, [dimension]);

  return dimensions;
}
