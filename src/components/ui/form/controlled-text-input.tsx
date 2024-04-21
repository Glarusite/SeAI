import type { Control, ControllerRenderProps, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import type { TextInputProps } from "react-native-paper";
import { TextInput } from "react-native-paper";

import ValidationText from "./validation-text";

export type ControlledTextInputProps<TData extends FieldValues, TContext = unknown> = {
  name: Path<TData>;
  control: Control<TData, TContext>;
  disabled?: boolean;
} & Omit<TextInputProps, keyof ControllerRenderProps>;

export default function ControlledTextInput<TData extends FieldValues, TContext = unknown>({
  name,
  control,
  onChangeText,
  defaultValue = "",
  ...inputProps
}: ControlledTextInputProps<TData, TContext>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as PathValue<TData, Path<TData>>}
      render={({ field: { value, onChange, ...controlProps }, fieldState: { error } }) => {
        return (
          <View>
            <TextInput
              mode="outlined"
              value={value || defaultValue}
              onChangeText={newValue => onChange(onChangeText?.(newValue) || newValue)}
              error={error != null}
              {...{ ...inputProps, ...controlProps }}
            />
            <ValidationText error={error} />
          </View>
        );
      }}
    />
  );
}
