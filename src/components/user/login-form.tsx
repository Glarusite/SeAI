import { isBlank, isEmail } from "@src/common/validators";
import { LoginFormData } from "@src/models";
import { setUser, useAppDispatch, useAuthenticateAndGetTokenMutation } from "@src/store";
import { FieldErrors, useForm } from "react-hook-form";
import { ActivityIndicator, Button, HelperText } from "react-native-paper";

import Form from "../ui/form";
import ControlledTextInput from "../ui/form/controlled-text-input";

const LoginForm: React.FC = () => {
  const { control, errors, isSubmitting, login, setFocus } = useLogin();

  return (
    <Form>
      <ControlledTextInput
        control={control}
        name="email"
        mode="outlined"
        label="E-mail"
        inputMode="email"
        textContentType="emailAddress"
        onSubmitEditing={() => setFocus("password")}
      />

      <ControlledTextInput
        control={control}
        name="password"
        mode="outlined"
        label="Password"
        inputMode="email"
        secureTextEntry
        onSubmitEditing={() => login()}
      />

      {errors.root && <HelperText type="error">{errors.root?.message}</HelperText>}

      <Button mode="contained" onPress={login} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator /> : "Login"}
      </Button>
    </Form>
  );
};

export default LoginForm;

function useLogin() {
  const dispatch = useAppDispatch();
  const [authenticateAndGetToken] = useAuthenticateAndGetTokenMutation();
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
      const { accessToken, userId } = await authenticateAndGetToken({ email, password }).unwrap();
      dispatch(setUser({ accessToken, email, userId }));
    } catch (error) {
      const message =
        typeof error === "object" && error != null && "data" in error && typeof error.data === "string"
          ? error.data === "Bad credentials"
            ? "Invalid email or password"
            : error.data
          : JSON.stringify(error);

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
  } else if (!isEmail(email)) {
    errors.email = { type: "pattern", message: "E-mail is invalid" };
  }

  if (isBlank(password)) {
    errors.password = { type: "required", message: "Password is required" };
  }

  return { errors, values };
}
