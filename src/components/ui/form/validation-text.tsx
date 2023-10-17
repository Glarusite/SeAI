import { Nullable } from "@src/models";
import { FieldError, GlobalError } from "react-hook-form";
import { HelperText } from "react-native-paper";

export interface ValidationTextProps {
  error: Nullable<GlobalError | FieldError>;
}

export default function ValidationText({ error }: ValidationTextProps) {
  if (error?.message) {
    return <HelperText type="error">{error.message}</HelperText>;
  }
}
