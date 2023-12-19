import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import type { DropDownPropsInterface } from "react-native-paper-dropdown";
import { default as RNDropDown } from "react-native-paper-dropdown";

export type DropDownProps = Omit<DropDownPropsInterface, "onDismiss" | "showDropDown" | "visible">;

export default function DropDown(props: DropDownProps) {
  const [visible, setVisible] = useState(false);
  const styles = useStyles();

  return (
    <RNDropDown
      showDropDown={() => setVisible(true)}
      onDismiss={() => setVisible(false)}
      visible={visible}
      dropDownItemTextStyle={styles.dropDownItemText}
      {...props}
    />
  );
}

function useStyles() {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        dropDownItemText: {
          color: colors.onBackground,
        },
      }),
    [colors],
  );
}
