import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import type { TextInputProps } from "react-native-paper";
import { useTheme } from "react-native-paper";
import type { DropDownPropsInterface } from "react-native-paper-dropdown";
import RNDropDown from "react-native-paper-dropdown";

export type DropDownProps = Omit<DropDownPropsInterface, "onDismiss" | "showDropDown" | "visible"> &
  Pick<TextInputProps, "disabled" | "error">;

export default function DropDown({ error, disabled, ...props }: DropDownProps) {
  const [visible, setVisible] = useState(false);
  const styles = useStyles();

  return (
    <RNDropDown
      inputProps={{ error, disabled }}
      dropDownItemTextStyle={styles.dropDownItemText}
      showDropDown={() => setVisible(!disabled && true)}
      onDismiss={() => setVisible(false)}
      visible={visible}
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
