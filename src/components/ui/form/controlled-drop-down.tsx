import type { Control, ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import type { DropdownProps } from "react-native-paper-dropdown";
import { Dropdown } from "react-native-paper-dropdown";

import ValidationText from "./validation-text";

export type ControlledDropDownProps<TData extends FieldValues, TContext = unknown> = {
  name: Path<TData>;
  control: Control<TData, TContext>;
  disabled?: boolean;
} & Omit<DropdownProps, keyof ControllerRenderProps | "setValue">;

export default function ControlledDropDown<TData extends FieldValues, TContext = unknown>({
  name,
  control,
  ...inputProps
}: ControlledDropDownProps<TData, TContext>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...controlProps }, fieldState: { error } }) => (
        <View>
          <Dropdown mode="outlined" onSelect={onChange} error={error != null} {...{ ...inputProps, ...controlProps }} />
          <ValidationText error={error} />
        </View>
      )}
    />
  );
}
