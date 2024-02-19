import type { ExpoConfig } from "expo/config";

const AppConfig: ExpoConfig = {
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  name: "SeAI",
  slug: "seai",
  scheme: "seai",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon-light.png",
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
    package: "co.seai",
    versionCode: 1,
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "co.seai",
  },
  web: {
    bundler: "metro",
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "b7b7d3e6-2ad7-4a5b-a877-6a6dbed92ebd",
    },
  },
  updates: {
    url: "https://u.expo.dev/b7b7d3e6-2ad7-4a5b-a877-6a6dbed92ebd",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  plugins: [
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera.",
      },
    ],
    [
      "expo-image-picker",
      {
        photosPermission: "Allow $(PRODUCT_NAME) to access your photos for upload.",
      },
    ],
    [
      "expo-router",
      {
        origin: "http://seai.co",
        asyncRoutes: {
          default: "development",
        },
      },
    ],
    [
      "expo-screen-orientation",
      {
        initialOrientation: "DEFAULT",
      },
    ],
  ],
};

export default AppConfig;
