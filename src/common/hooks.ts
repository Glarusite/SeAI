import { useNavigationContainerRef } from "expo-router";
import type { Orientation } from "expo-screen-orientation";
import {
  addOrientationChangeListener,
  getOrientationAsync,
  removeOrientationChangeListener,
} from "expo-screen-orientation";
import { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";

import type { MaybePromise } from "@src/models";

export function useAsync(effect: () => Promise<void>, deps: unknown[]) {
  useEffect(() => {
    void effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useAppNavigation(effect: () => MaybePromise<void>, deps: unknown[]) {
  const rootNavigation = useNavigationContainerRef();
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const setIsReady = () => setIsNavigationReady(true);

  useEffect(() => {
    if (rootNavigation == null) {
      return;
    }

    if (Platform.OS === "web") {
      rootNavigation.addListener("state", setIsReady);
      return () => rootNavigation.removeListener("state", setIsReady);
    } else {
      setIsNavigationReady(true);
    }
  }, [rootNavigation]);

  useEffect(() => {
    if (isNavigationReady) {
      void effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavigationReady, ...deps]);
}

export function useAppDimensions(dimension: "screen" | "window" = "window") {
  const [dimensions, setDimensions] = useState(Dimensions.get(dimension));
  useEffect(() => {
    const dimensionsHandler = Dimensions.addEventListener("change", () => setDimensions(Dimensions.get(dimension)));
    return () => dimensionsHandler.remove();
  }, [dimension]);

  return dimensions;
}

export function useAppOrientation() {
  const [orientation, setOrientation] = useState<Orientation>();

  useAsync(async () => setOrientation(await getOrientationAsync()), []);

  useEffect(() => {
    const subscription = addOrientationChangeListener(({ orientationInfo }) =>
      setOrientation(orientationInfo.orientation),
    );
    return () => removeOrientationChangeListener(subscription);
  }, []);

  return orientation;
}
