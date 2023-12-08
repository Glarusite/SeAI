import { useState } from "react";
import type { Control, ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import type { DropDownPropsInterface } from "react-native-paper-dropdown";
import DropDown from "react-native-paper-dropdown";

import ValidationText from "./validation-text";

export type ControlledDropDownProps<TData extends FieldValues, TContext = unknown> = {
  name: Path<TData>;
  control: Control<TData, TContext>;
  disabled?: boolean;
} & Omit<DropDownPropsInterface, keyof ControllerRenderProps | "onDismiss" | "showDropDown" | "visible" | "setValue">;

export default function ControlledDropDown<TData extends FieldValues, TContext = unknown>({
  name,
  control,
  ...inputProps
}: ControlledDropDownProps<TData, TContext>) {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { disabled, ...controlProps }, fieldState: { error } }) => (
        <View>
          <DropDown
            mode="outlined"
            setValue={value => controlProps.onChange(value)}
            inputProps={{ error: error != null, disabled }}
            showDropDown={() => setVisible(true)}
            onDismiss={() => setVisible(false)}
            visible={visible}
            dropDownItemTextStyle={{ color: theme.colors.onBackground }}
            {...{ ...inputProps, ...controlProps }}
          />
          <ValidationText error={error} />
        </View>
      )}
    />
  );
}
