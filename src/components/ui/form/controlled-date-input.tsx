import type { Control, ControllerRenderProps, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { DatePickerInput, en, registerTranslation } from "react-native-paper-dates";
import type { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";

import ValidationText from "./validation-text";

registerTranslation("en", en);

export type ControlledDateInputProps<TData extends FieldValues, TContext = unknown> = {
  name: Path<TData>;
  control: Control<TData, TContext>;
} & Omit<DatePickerInputProps, keyof ControllerRenderProps>;

export default function ControlledTextInput<TData extends FieldValues, TContext = unknown>({
  name,
  control,
  defaultValue = "",
  ...inputProps
}: ControlledDateInputProps<TData, TContext>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as PathValue<TData, Path<TData>>}
      render={({ field: controlProps, fieldState: { error } }) => (
        <View>
          <DatePickerInput mode="outlined" error={error != null} {...{ ...inputProps, ...controlProps }} />
          <ValidationText error={error} />
        </View>
      )}
    />
  );
}
