import type { ColorSchemeName } from "react-native";

export interface AppFlags {
  colorScheme: ColorSchemeName;
  nextLoginReminderTimestamp: string;
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error?: string;
  detail?: string;
  path?: string;
  instance?: string;
}
