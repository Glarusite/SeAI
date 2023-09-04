import { useAppDispatch } from "@src/hooks/store";
import { setUser } from "@src/slices/user-slice";
import { useCallback } from "react";
import { Text, View } from "react-native";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const login = useCallback(() => {
    dispatch(
      setUser({
        id: 1,
      }),
    );
  }, [dispatch]);

  return (
    <View>
      <Text onPress={login}>Login</Text>
    </View>
  );
};

export default Login;
