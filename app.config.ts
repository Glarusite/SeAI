import { ExpoConfig } from "expo/config";

const AppConfig: ExpoConfig = {
  experiments: {
    tsconfigPaths: true,
    turboModules: true,
    typedRoutes: true,
  },
  name: "SeAI",
  slug: "SeAI",
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
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    favicon: "./assets/favicon.png",
  },
  plugins: ["expo-router"],
};

export default AppConfig;
