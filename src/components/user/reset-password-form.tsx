import { isBlank, isNotEmail } from "@src/common/validators";
import type { PasswordResetFormData } from "@src/models";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

export default function ResetPasswordForm() {
  const { control, errors, isSubmitting, resetPassword, setFocus } = useResetPassword();

  return (
    <FormView>
      <ControlledTextInput
        control={control}
        testID="email"
        name="email"
        label="E-mail"
        inputMode="email"
        textContentType="emailAddress"
        onSubmitEditing={() => setFocus("password")}
      />

      <ControlledTextInput
        control={control}
        name="password"
        label="New password"
        textContentType="newPassword"
        secureTextEntry
        onSubmitEditing={() => setFocus("repeatPassword")}
      />

      <ControlledTextInput
        control={control}
        name="repeatPassword"
        mode="outlined"
        label="Repeat new password"
        textContentType="newPassword"
        secureTextEntry
        onSubmitEditing={() => resetPassword()}
      />

      <ValidationText error={errors.root} />

      <Button mode="contained" onPress={resetPassword} disabled={isSubmitting}>
        {isSubmitting ? <ButtonActivityIndicator /> : "Reset password"}
      </Button>
    </FormView>
  );
}

function useResetPassword() {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    resetField,
    setError,
    setFocus,
  } = useForm<PasswordResetFormData>({ resolver });

  const resetPassword = handleSubmit(() => {
    resetField("password");
    resetField("repeatPassword");
    setError("root", { message: "Not implemented" });
  });

  return { control, errors, isSubmitting, resetPassword, setFocus };
}

function resolver(values: PasswordResetFormData) {
  const { email, password, repeatPassword } = values;
  const errors: FieldErrors<PasswordResetFormData> = {};

  if (isBlank(email)) {
    errors.email = { type: "required", message: "E-mail is required" };
  } else if (isNotEmail(email)) {
    errors.email = { type: "pattern", message: "E-mail is invalid" };
  }

  if (isBlank(password)) {
    errors.password = { type: "required", message: "Password is required" };
  }

  if (isBlank(repeatPassword)) {
    errors.repeatPassword = { type: "required", message: "Repeat password is required" };
  } else if (password !== repeatPassword) {
    errors.repeatPassword = { type: "validate", message: "Passwords do not match" };
  }

  return { errors, values };
}
