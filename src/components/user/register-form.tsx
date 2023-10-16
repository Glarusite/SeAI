import { isBlank, isEmail } from "@src/common/validators";
import { RegisterFormData } from "@src/models";
import { useRegisterMutation } from "@src/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { ActivityIndicator, Button, HelperText } from "react-native-paper";
import Toast from "react-native-toast-message";

import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";

const RegisterForm: React.FC = () => {
  const { control, errors, isSubmitting, register, setFocus } = useRegister();

  return (
    <FormView>
      <ControlledTextInput
        control={control}
        name="email"
        mode="outlined"
        label="E-mail"
        inputMode="email"
        textContentType="emailAddress"
        onSubmitEditing={() => setFocus("firstName")}
      />

      <ControlledTextInput
        control={control}
        name="firstName"
        mode="outlined"
        label="First name"
        textContentType="givenName"
        onSubmitEditing={() => setFocus("lastName")}
      />

      <ControlledTextInput
        control={control}
        name="lastName"
        mode="outlined"
        label="Last name"
        textContentType="familyName"
        onSubmitEditing={() => setFocus("password")}
      />

      <ControlledTextInput
        control={control}
        name="password"
        mode="outlined"
        label="Password"
        secureTextEntry
        onSubmitEditing={() => setFocus("repeatPassword")}
      />

      <ControlledTextInput
        control={control}
        name="repeatPassword"
        mode="outlined"
        label="Repeat password"
        secureTextEntry
        onSubmitEditing={() => register()}
      />

      {errors.root && <HelperText type="error">{errors.root?.message}</HelperText>}

      <Button mode="contained" onPress={register} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator /> : "Register"}
      </Button>
    </FormView>
  );
};

export default RegisterForm;

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

  const register = handleSubmit(async formData => {
    try {
      await registerRequest(formData).unwrap();
      router.replace("/user/login");
      Toast.show({
        type: "success",
        text1: "Registration successful!",
        text2: "You can now continue to login",
      });
    } catch (error) {
      const message =
        typeof error === "object" && error != null && "data" in error && typeof error.data === "string"
          ? error.data
          : JSON.stringify(error);

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