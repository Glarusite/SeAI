import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";

import ButtonActivityIndicator from "../ui/buttons/button-activity-indicator";
import ControlledTextInput from "../ui/form/controlled-text-input";
import FormView from "../ui/form/form-view";
import ValidationText from "../ui/form/validation-text";

import { toErrorMessage } from "@src/common/error";
import { isBlank, isNotEmail } from "@src/common/validators";
import type { LoginFormData } from "@src/models";
import { setUser, useAppDispatch, useAuthenticateAndGetTokenMutation } from "@src/store";

export default function LoginForm() {
  const { control, errors, isSubmitting, login, setFocus } = useLogin();

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
        label="Password"
        textContentType="password"
        secureTextEntry
        onSubmitEditing={() => login()}
      />

      <ValidationText error={errors.root} />

      <Button icon="login" mode="contained" onPress={login} disabled={isSubmitting}>
        {isSubmitting ? <ButtonActivityIndicator /> : "Login"}
      </Button>
    </FormView>
  );
}

function useLogin() {
  const dispatch = useAppDispatch();
  const [loginRequest] = useAuthenticateAndGetTokenMutation();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    resetField,
    setError,
    setFocus,
  } = useForm<LoginFormData>({ resolver });

  const login = handleSubmit(async ({ email, password }) => {
    try {
      const { accessToken, userId } = await loginRequest({ email, password }).unwrap();
      dispatch(setUser({ accessToken, email, userId, role: "SEAFARER" }));
    } catch (error) {
      const originalMessage = toErrorMessage(error);
      const message = originalMessage === "Bad credentials" ? "Invalid e-mail or password" : originalMessage;
      setError("root", { message });
      resetField("password");
      setFocus("password");
    }
  });

  return { control, errors, isSubmitting, login, setFocus };
}

function resolver(values: LoginFormData) {
  const { email, password } = values;
  const errors: FieldErrors<LoginFormData> = {};

  if (isBlank(email)) {
    errors.email = { type: "required", message: "E-mail is required" };
  } else if (isNotEmail(email)) {
    errors.email = { type: "pattern", message: "E-mail is invalid" };
  }

  if (isBlank(password)) {
    errors.password = { type: "required", message: "Password is required" };
  }

  return { errors, values };
}
