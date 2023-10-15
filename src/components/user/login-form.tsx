import { isBlank, isEmail } from "@src/common/validators";
import { LoginFormData } from "@src/models";
import { setUser, useAppDispatch, useAuthenticateAndGetTokenMutation } from "@src/store";
import { FieldErrors } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";

import FormView, { FormViewProps } from "../ui/form-view";

const LoginForm: React.FC = () => {
  const login = useLogin();

  return (
    <FormView submitFactory={login} resolver={resolver}>
      {errors => ({
        email: <TextInput label="Email" mode="outlined" keyboardType="email-address" error={errors.email != null} />,
        password: <TextInput label="Password" mode="outlined" secureTextEntry error={errors.password != null} />,
        submit: <Button mode="contained">Login</Button>,
      })}
    </FormView>
  );
};

export default LoginForm;

function useLogin() {
  const dispatch = useAppDispatch();
  const [authenticateAndGetToken] = useAuthenticateAndGetTokenMutation();

  const login: FormViewProps<LoginFormData>["submitFactory"] =
    ({ setError, resetField }) =>
    async ({ email, password }) => {
      try {
        const { accessToken, userId } = await authenticateAndGetToken({ email, password }).unwrap();
        dispatch(setUser({ accessToken, email, userId }));
      } catch (error) {
        const message =
          typeof error === "object" && error != null && "data" in error && typeof error.data === "string" && error.data
            ? error.data === "Bad credentials"
              ? "Invalid email or password"
              : error.data
            : JSON.stringify(error);

        setError("root", { message });
        resetField("password");
      }
    };

  return login;
}

function resolver(values: LoginFormData) {
  const { email, password } = values;
  const errors: FieldErrors<LoginFormData> = {};

  if (isBlank(email)) {
    errors.email = { type: "required", message: "Email is required" };
  } else if (!isEmail(email)) {
    errors.email = { type: "pattern", message: "Email is invalid" };
  }

  if (isBlank(password)) {
    errors.password = { type: "required", message: "Password is required" };
  }

  return { errors, values };
}
