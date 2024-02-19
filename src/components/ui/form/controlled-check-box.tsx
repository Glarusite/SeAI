import type { PropsWithChildren } from "react";
import type { Control, ControllerRenderProps, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import type { CheckboxProps } from "react-native-paper";
import { Checkbox, Text, useTheme } from "react-native-paper";

import ValidationText from "./validation-text";

export type ControlledCheckBoxProps<TData extends FieldValues, TContext = unknown> = {
  name: Path<TData>;
  control: Control<TData, TContext>;
  disabled?: boolean;
  defaultValue?: boolean;
} & Omit<CheckboxProps, keyof ControllerRenderProps | "status"> &
  Required<PropsWithChildren>;

export default function ControlledCheckBox<TData extends FieldValues, TContext = unknown>({
  name,
  control,
  children,
  defaultValue,
  ...inputProps
}: ControlledCheckBoxProps<TData, TContext>) {
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as PathValue<TData, Path<TData>>}
      render={({ field: { onChange, onBlur, value, disabled }, fieldState: { error } }) => (
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              onPress={() => {
                onChange(!value);
                onBlur();
              }}
              status={value === true ? "checked" : value === false ? "unchecked" : "indeterminate"}
              disabled={disabled}
              uncheckedColor={error ? theme.colors.error : undefined}
              {...inputProps}
            />
            <Text>{children}</Text>
          </View>
          <ValidationText error={error} />
        </View>
      )}
    />
  );
}
