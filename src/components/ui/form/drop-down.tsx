import { forwardRef, useMemo, useState } from "react";
import type { TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from "react-native";
import type { TextInputProps } from "react-native-paper";
import { useTheme } from "react-native-paper";
import type { DropDownPropsInterface } from "react-native-paper-dropdown";
import RNPDropDown from "react-native-paper-dropdown";

export type DropDownProps = Omit<DropDownPropsInterface, "onDismiss" | "showDropDown" | "visible"> &
  Pick<TextInputProps, "disabled" | "error">;

const DropDown = forwardRef<TouchableWithoutFeedback, DropDownProps>(function DropDown(
  { error, disabled, ...props },
  ref,
) {
  const [visible, setVisible] = useState(false);
  const styles = useStyles();

  return (
    <RNPDropDown
      ref={ref}
      inputProps={{ error, disabled }}
      dropDownItemTextStyle={styles.dropDownItemText}
      showDropDown={() => setVisible(!disabled && true)}
      onDismiss={() => setVisible(false)}
      visible={visible}
      {...props}
    />
  );
});

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

export default DropDown;
