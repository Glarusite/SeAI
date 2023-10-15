import { useAppDispatch } from "@src/hooks/store";
import { setUser } from "@src/slices/user";
import { useAuthenticateAndGetTokenMutation } from "@src/store/api";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticateAndGetToken] = useAuthenticateAndGetTokenMutation();

  const login = useCallback(async () => {
    try {
      const { accessToken, userId } = await authenticateAndGetToken({ email, password }).unwrap();
      dispatch(setUser({ accessToken, email, userId }));
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }, [authenticateAndGetToken, dispatch, email, password]);

  return (
    <>
      <Image source={require("@assets/icon.png")} style={{ height: 166, width: 190 }} />
      <Text style={{ fontSize: 48, fontFamily: "Impact" }}>SeAI</Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button onPress={login} mode="contained">
        Login
      </Button>
      <Button onPress={register} mode="outlined">
        Register
      </Button>
      <Button onPress={about} mode="outlined">
        About
      </Button>
    </>
  );
};

export default Login;

function register() {
  router.replace("/user/register");
}

function about() {
  router.replace("/about");
}
