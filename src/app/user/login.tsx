import { isBlank, isEmail } from "@src/common/validators";
import FormView, { FormViewProps } from "@src/components/form-view";
import { useAppDispatch } from "@src/hooks/store";
import { LoginFormData } from "@src/models";
import { setUser } from "@src/slices/user";
import { useAuthenticateAndGetTokenMutation } from "@src/store/api";
import { Image, ImageSource } from "expo-image";
import { router } from "expo-router";
import { FieldErrors } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const Login: React.FC = () => {
  const login = useLogin();

  return (
    <View style={styles.container}>
      <Image source={require("@assets/icon.png") as ImageSource} style={styles.image} />
      <Text style={styles.titleText}>SeAI</Text>

      <FormView submitFactory={login} resolver={resolver}>
        {errors => ({
          email: <TextInput label="Email" mode="outlined" keyboardType="email-address" error={errors.email != null} />,
          password: <TextInput label="Password" mode="outlined" secureTextEntry error={errors.password != null} />,
          submit: <Button mode="contained">Login</Button>,
        })}
      </FormView>

      <Button mode="outlined" onPress={() => router.replace("/user/register")}>
        Register
      </Button>
      <Button mode="outlined" onPress={() => router.replace("/about")}>
        About
      </Button>
    </View>
  );
};

export default Login;

function useLogin() {
  const dispatch = useAppDispatch();
  const [authenticateAndGetToken] = useAuthenticateAndGetTokenMutation();

  const login: FormViewProps<LoginFormData>["submitFactory"] =
    ({ setError, resetField }) =>
    async ({ email, password }: LoginFormData) => {
      try {
        console.log("login");
        const { accessToken, userId } = await authenticateAndGetToken({ email, password }).unwrap();
        dispatch(setUser({ accessToken, email, userId }));
      } catch (error) {
        const message = JSON.stringify(error, null, 2);
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

  return {
    errors,
    values,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    width: "100%",
    maxWidth: 480,
    justifyContent: "center",
  },

  image: {
    height: 166,
    width: 190,
    alignSelf: "center",
  },

  titleText: {
    fontSize: 48,
    fontFamily: "Impact",
    alignSelf: "center",
  },
});
