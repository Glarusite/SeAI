import { ExpoConfig } from "expo/config";

const AppConfig: ExpoConfig = {
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  name: "SeAI",
  slug: "SeAI",
  scheme: "seai",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  ios: {
    supportsTablet: true,
  },
  web: {
    bundler: "metro",
    favicon: "./assets/favicon.png",
  },
};

export default AppConfig;
