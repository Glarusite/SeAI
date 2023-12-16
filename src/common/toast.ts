import Toast from "react-native-toast-message";

export function showFeatureInDevelopmentToast() {
  Toast.show({ type: "info", text1: "Feature in development" });
}
