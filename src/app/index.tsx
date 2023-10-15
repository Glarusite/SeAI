import { setUser, useAppDispatch } from "@src/store";
import { Link } from "expo-router";
import { useCallback } from "react";
import { Text } from "react-native-paper";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(setUser({}));
  }, [dispatch]);

  return (
    <>
      <Text>Home</Text>
      <Link href="/user/">
        <Text>Profile</Text>
      </Link>
      <Text onPress={logout}>Logout</Text>
    </>
  );
};

export default App;
