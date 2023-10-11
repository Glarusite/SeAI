import { useAppDispatch } from "@src/hooks/store";
import { setUser } from "@src/slices/user";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Button, TextInput, Text } from "react-native-paper";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useCallback(() => {
    dispatch(
      setUser({
        id: 1,
        username,
      }),
    );
  }, [dispatch, username]);

  return (
    <>
      <Image source={require("@assets/icon.png")} style={{ height: 166, width: 190 }} />
      <Text style={{ fontSize: 48, fontFamily: "Impact" }}>SeAI</Text>
      <TextInput label="Email" value={username} onChangeText={setUsername} />
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
