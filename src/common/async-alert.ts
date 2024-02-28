import { Alert } from "react-native";
import type { AlertOptions, AlertType } from "react-native";

export const AsyncAlert = {
  alert: async (title: string, message: string, options?: AlertOptions) => {
    return await new Promise(resolve => {
      Alert.alert(title, message, [{ text: "OK", onPress: resolve }], options);
    });
  },

  confirm: async (title: string, message: string, options?: AlertOptions) => {
    return await new Promise<boolean>(resolve => {
      Alert.alert(
        title,
        message,
        [
          { text: "OK", onPress: () => resolve(true) },
          { text: "Cancel", onPress: () => resolve(false) },
        ],
        options,
      );
    });
  },

  prompt: async (
    title: string,
    message?: string,
    type?: AlertType,
    defaultValue?: string,
    keyboardType?: string,
    options?: AlertOptions,
  ) => {
    return await new Promise(resolve => {
      Alert.prompt(title, message, resolve, type, defaultValue, keyboardType, options);
    });
  },
};
