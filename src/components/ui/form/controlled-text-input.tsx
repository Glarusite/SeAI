import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

import ValidationText from "./validation-text";

export type ControlledTextInputProps<TData extends FieldValues, TContext = unknown> = {
  name: Path<TData>;
  control: Control<TData, TContext>;
} & Omit<TextInputProps, "onChangeText" | "error">;

export default function ControlledTextInput<TData extends FieldValues, TContext = unknown>({
  name,
  control,
  ...inputProps
}: ControlledTextInputProps<TData, TContext>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={"" as PathValue<TData, Path<TData>>}
      render={({ field: { onChange, ...controlProps }, fieldState: { error } }) => (
        <View>
          <TextInput onChangeText={onChange} error={error != null} {...{ ...inputProps, ...controlProps }} />
          <ValidationText error={error} />
        </View>
      )}
    />
  );
}
