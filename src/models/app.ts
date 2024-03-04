import type { ColorSchemeName } from "react-native";
import type { DropDownPropsInterface } from "react-native-paper-dropdown";

import type { Unboxed } from "./types";

export interface AppFlags {
  colorScheme: ColorSchemeName;
}

export type DropDownList<TValue extends string | number | undefined> = DropDownListItem<TValue>[];

export type DropDownListItem<TValue extends string | number | undefined> = Unboxed<DropDownPropsInterface["list"]> & {
  value?: TValue | "";
};
