import type { Control, ControllerRenderProps, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { DatePickerInput, enGB, registerTranslation } from "react-native-paper-dates";
import type { DatePickerInputProps } from "react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared";

import ValidationText from "./validation-text";

registerTranslation("en-GB", enGB);

export type ControlledDateInputProps<TData extends FieldValues, TContext = unknown> = {
  name: Path<TData>;
  control: Control<TData, TContext>;
  disabled?: boolean;
} & Omit<DatePickerInputProps, keyof Omit<ControllerRenderProps, "onBlur">>;

export default function ControlledDateInput<TData extends FieldValues, TContext = unknown>({
  name,
  control,
  defaultValue = "",
  onBlur: onInputBlur,
  ...inputProps
}: ControlledDateInputProps<TData, TContext>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as PathValue<TData, Path<TData>>}
      render={({ field: { disabled, onBlur: onControlBlur, ...controlProps }, fieldState: { error } }) => (
        <View>
          <DatePickerInput
            mode="outlined"
            error={error != null}
            iconStyle={{ display: disabled ? "none" : undefined }}
            disabled={disabled}
            animationType="fade"
            onBlur={event => {
              onInputBlur?.(event);
              onControlBlur();
            }}
            {...{ ...inputProps, ...controlProps }}
          />
          <ValidationText error={error} />
        </View>
      )}
    />
  );
}
