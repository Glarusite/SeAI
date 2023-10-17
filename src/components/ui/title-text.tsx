import { useMemo } from "react";
import { StyleSheet, TextStyle } from "react-native";
import { Text } from "react-native-paper";

export type TitleTextProps = React.PropsWithChildren<Pick<TextStyle, "alignSelf" | "fontFamily" | "fontSize">>;

export function TitleText({ alignSelf = "center", fontFamily, fontSize = 36, children }: TitleTextProps) {
  const styles = useMemo(
    () => StyleSheet.create({ titleText: { fontSize, fontFamily, alignSelf } }),
    [alignSelf, fontFamily, fontSize],
  );

  return <Text style={styles.titleText}>{children}</Text>;
}
