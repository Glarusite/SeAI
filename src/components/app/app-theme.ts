import type { Theme } from "@react-navigation/native";
import { useMemo } from "react";
import type { ColorSchemeName } from "react-native";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export function useAppTheme(appColorScheme: ColorSchemeName | undefined) {
  const colorScheme = useColorScheme();
  appColorScheme = appColorScheme || colorScheme;

  return useMemo(() => {
    const appTheme =
      appColorScheme === "light"
        ? {
            ...MD3LightTheme,
            colors: {
              primary: "rgb(0, 93, 182)",
              onPrimary: "rgb(255, 255, 255)",
              primaryContainer: "rgb(214, 227, 255)",
              onPrimaryContainer: "rgb(0, 27, 61)",
              secondary: "rgb(49, 93, 168)",
              onSecondary: "rgb(255, 255, 255)",
              secondaryContainer: "rgb(216, 226, 255)",
              onSecondaryContainer: "rgb(0, 26, 65)",
              tertiary: "rgb(0, 95, 175)",
              onTertiary: "rgb(255, 255, 255)",
              tertiaryContainer: "rgb(212, 227, 255)",
              onTertiaryContainer: "rgb(0, 28, 58)",
              error: "rgb(186, 26, 26)",
              onError: "rgb(255, 255, 255)",
              errorContainer: "rgb(255, 218, 214)",
              onErrorContainer: "rgb(65, 0, 2)",
              background: "rgb(253, 251, 255)",
              onBackground: "rgb(26, 27, 30)",
              surface: "rgb(253, 251, 255)",
              onSurface: "rgb(26, 27, 30)",
              surfaceVariant: "rgb(224, 226, 236)",
              onSurfaceVariant: "rgb(67, 71, 78)",
              outline: "rgb(116, 119, 127)",
              outlineVariant: "rgb(196, 198, 207)",
              shadow: "rgb(0, 0, 0)",
              scrim: "rgb(0, 0, 0)",
              inverseSurface: "rgb(47, 48, 51)",
              inverseOnSurface: "rgb(241, 240, 244)",
              inversePrimary: "rgb(169, 199, 255)",
              elevation: {
                level0: "transparent",
                level1: "rgb(240, 243, 251)",
                level2: "rgb(233, 238, 249)",
                level3: "rgb(225, 234, 247)",
                level4: "rgb(223, 232, 246)",
                level5: "rgb(218, 229, 245)",
              },
              surfaceDisabled: "rgba(26, 27, 30, 0.12)",
              onSurfaceDisabled: "rgba(26, 27, 30, 0.66)",
              backdrop: "rgba(45, 48, 56, 0.4)",
            },
          }
        : {
            ...MD3DarkTheme,
            colors: {
              primary: "rgb(169, 199, 255)",
              onPrimary: "rgb(0, 48, 98)",
              primaryContainer: "rgb(0, 70, 139)",
              onPrimaryContainer: "rgb(214, 227, 255)",
              secondary: "rgb(173, 198, 255)",
              onSecondary: "rgb(0, 46, 105)",
              secondaryContainer: "rgb(14, 68, 142)",
              onSecondaryContainer: "rgb(216, 226, 255)",
              tertiary: "rgb(165, 200, 255)",
              onTertiary: "rgb(0, 49, 95)",
              tertiaryContainer: "rgb(0, 71, 134)",
              onTertiaryContainer: "rgb(212, 227, 255)",
              error: "rgb(255, 180, 171)",
              onError: "rgb(105, 0, 5)",
              errorContainer: "rgb(147, 0, 10)",
              onErrorContainer: "rgb(255, 180, 171)",
              background: "rgb(26, 27, 30)",
              onBackground: "rgb(227, 226, 230)",
              surface: "rgb(26, 27, 30)",
              onSurface: "rgb(227, 226, 230)",
              surfaceVariant: "rgb(67, 71, 78)",
              onSurfaceVariant: "rgb(196, 198, 207)",
              outline: "rgb(142, 144, 153)",
              outlineVariant: "rgb(67, 71, 78)",
              shadow: "rgb(0, 0, 0)",
              scrim: "rgb(0, 0, 0)",
              inverseSurface: "rgb(227, 226, 230)",
              inverseOnSurface: "rgb(47, 48, 51)",
              inversePrimary: "rgb(0, 93, 182)",
              elevation: {
                level0: "transparent",
                level1: "rgb(33, 36, 41)",
                level2: "rgb(37, 41, 48)",
                level3: "rgb(42, 46, 55)",
                level4: "rgb(43, 48, 57)",
                level5: "rgb(46, 51, 62)",
              },
              surfaceDisabled: "rgba(227, 226, 230, 0.12)",
              onSurfaceDisabled: "rgba(227, 226, 230, 0.66)",
              backdrop: "rgba(45, 48, 56, 0.4)",
            },
          };

    const navTheme: Theme = {
      colors: {
        background: appTheme.colors.background,
        border: appTheme.colors.outline,
        card: appTheme.colors.surface,
        primary: appTheme.colors.primary,
        text: appTheme.colors.onSurface,
        notification: appTheme.colors.primary,
      },
      dark: appColorScheme === "dark",
    };

    return { appTheme, navTheme };
  }, [appColorScheme]);
}

export type AppTheme = ReturnType<typeof useAppTheme>;
