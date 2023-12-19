import { useMemo } from "react";
import type { TextStyle } from "react-native";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

export type TitleTextProps = React.PropsWithChildren<
  Pick<TextStyle, "alignSelf" | "fontFamily" | "fontSize" | "color">
>;

export function PageTitle({ alignSelf = "center", fontFamily, fontSize = 36, color, children }: TitleTextProps) {
  const { colors } = useTheme();
  color = color || colors.onBackground;
  const styles = useMemo(
    () => StyleSheet.create({ titleText: { fontSize, fontFamily, alignSelf, color } }),
    [alignSelf, fontFamily, fontSize, color],
  );

  return <Text style={styles.titleText}>{children}</Text>;
}
