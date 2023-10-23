import { toErrorMessage } from "@src/common/error";
import { isBlank, isEmail } from "@src/common/validators";
import type { RegisterFormData } from "@src/models";
import { useRegisterMutation } from "@src/store";
import { router } from "expo-router";
import { useEffect } from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

export default function RegisterForm() {
  const { control, errors, isSubmitting, register, setFocus } = useRegister();

  return (
    <FormView>
      <ControlledTextInput
        control={control}
        name="email"
        label="E-mail"
        inputMode="email"
        textContentType="emailAddress"
        onSubmitEditing={() => setFocus("firstName")}
      />

      <ControlledTextInput
        control={control}
        name="firstName"
        label="First name"
        textContentType="givenName"
        onSubmitEditing={() => setFocus("lastName")}
      />

      <ControlledTextInput
        control={control}
        name="lastName"
        label="Last name"
        textContentType="familyName"
        onSubmitEditing={() => setFocus("password")}
      />

      <ControlledTextInput
        control={control}
        name="password"
        label="Password"
        textContentType="newPassword"
        secureTextEntry
        onSubmitEditing={() => setFocus("repeatPassword")}
      />

      <ControlledTextInput
        control={control}
        name="repeatPassword"
        mode="outlined"
        label="Repeat password"
        textContentType="newPassword"
        secureTextEntry
        onSubmitEditing={() => register()}
      />

      <ValidationText error={errors.root} />

      <Button mode="contained" onPress={register} disabled={isSubmitting}>
        {isSubmitting ? <ButtonActivityIndicator /> : "Register"}
      </Button>
    </FormView>
  );
}

function useRegister() {
  const [registerRequest] = useRegisterMutation();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    resetField,
    setError,
    setFocus,
  } = useForm<RegisterFormData>({ resolver });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setFocus("email"), []);

  const register = handleSubmit(async values => {
    try {
      await registerRequest(values).unwrap();
      router.replace("/user/login");
      Toast.show({
        type: "success",
        text1: "Registration successful!",
        text2: "You can now continue to login",
      });
    } catch (error) {
      const message = toErrorMessage(error);
      setError("root", { message });
      resetField("password");
      resetField("repeatPassword");
    }
  });

  return { control, errors, isSubmitting, register, setFocus };
}

function resolver(values: RegisterFormData) {
  const { email, firstName, lastName, password, repeatPassword } = values;
  const errors: FieldErrors<RegisterFormData> = {};

  if (isBlank(email)) {
    errors.email = { type: "required", message: "E-mail is required" };
  } else if (!isEmail(email)) {
    errors.email = { type: "pattern", message: "E-mail is invalid" };
  }

  if (isBlank(firstName)) {
    errors.firstName = { type: "required", message: "First name is required" };
  }

  if (isBlank(lastName)) {
    errors.lastName = { type: "required", message: "Last name is required" };
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
