import type { ColorSchemeName } from "react-native";
import type { DropDownPropsInterface } from "react-native-paper-dropdown";

import type { Unboxed } from "./types";

export interface AppFlags {
  colorScheme: ColorSchemeName;
  nextLoginReminderDate: Date;
}

export type DropDownList<TValue extends string | number | undefined> = DropDownListItem<TValue>[];

export type DropDownListItem<TValue extends string | number | undefined> = Unboxed<DropDownPropsInterface["list"]> & {
  value?: TValue | "";
};

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error?: string;
  detail?: string;
  path?: string;
  instance?: string;
}
