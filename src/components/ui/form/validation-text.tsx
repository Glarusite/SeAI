import type { FieldError, GlobalError } from "react-hook-form";
import { HelperText } from "react-native-paper";

import type { Nullable } from "@src/models";

export interface ValidationTextProps {
  error: Nullable<GlobalError | FieldError>;
}

export default function ValidationText({ error }: ValidationTextProps) {
  if (error?.message) {
    return <HelperText type="error">{error.message}</HelperText>;
  }
}
