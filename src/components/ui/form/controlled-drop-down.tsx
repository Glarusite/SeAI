import type { Control, ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { View } from "react-native";

import type { DropDownProps } from "./drop-down";
import DropDown from "./drop-down";
import ValidationText from "./validation-text";

export type ControlledDropDownProps<TData extends FieldValues, TContext = unknown> = {
  name: Path<TData>;
  control: Control<TData, TContext>;
  disabled?: boolean;
} & Omit<DropDownProps, keyof ControllerRenderProps | "setValue">;

export default function ControlledDropDown<TData extends FieldValues, TContext = unknown>({
  name,
  control,
  ...inputProps
}: ControlledDropDownProps<TData, TContext>) {
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
            {...{ ...inputProps, ...controlProps }}
          />
          <ValidationText error={error} />
        </View>
      )}
    />
  );
}
