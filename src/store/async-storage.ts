import AsyncStorage from "@react-native-async-storage/async-storage";
import { safeJsonParse } from "@src/common/json";

import { AppStoreState } from "./configure";

export async function getAsyncStorageState() {
  const state = await AsyncStorage.getItem("state");
  const preloadedState = safeJsonParse<AppStoreState>(state);
  return preloadedState;
}
