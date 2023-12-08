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
} & Omit<TextInputProps, "onChangeText" | keyof ControllerRenderProps>;

export default function ControlledTextInput<TData extends FieldValues, TContext = unknown>({
  name,
  control,
  defaultValue = "",
  ...inputProps
}: ControlledTextInputProps<TData, TContext>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as PathValue<TData, Path<TData>>}
      render={({ field: { onChange, ...controlProps }, fieldState: { error } }) => (
        <View>
          <TextInput
            mode="outlined"
            onChangeText={onChange}
            error={error != null}
            {...{ ...inputProps, ...controlProps }}
          />
          <ValidationText error={error} />
        </View>
      )}
    />
  );
}
