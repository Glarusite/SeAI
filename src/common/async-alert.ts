import { Alert, Platform } from "react-native";
import type { AlertOptions, AlertType } from "react-native";

export const AsyncAlert = {
  alert: async (title: string, message: string, options?: AlertOptions) => {
    if (Platform.OS === "web") {
      // TODO: Fix conditional DOM type access
      // eslint-disable-next-line no-eval
      eval(`alert("${title}\\n\\n${message}")`);
      return;
    }

    return await new Promise(resolve => {
      Alert.alert(title, message, [{ text: "OK", onPress: resolve }], options);
    });
  },

  confirm: async (title: string, message: string, options?: AlertOptions) => {
    if (Platform.OS === "web") {
      // TODO: Fix conditional DOM type access
      // eslint-disable-next-line no-eval
      return eval(`confirm("${title}\\n\\n${message}")`) as boolean;
    }

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
    if (Platform.OS === "web") {
      // TODO: Fix conditional DOM type access
      // eslint-disable-next-line no-eval
      return eval(`confirm("${title}\\n\\n${message}")`) as string;
    }

    return await new Promise(resolve => {
      Alert.prompt(title, message, resolve, type, defaultValue, keyboardType, options);
    });
  },
};
