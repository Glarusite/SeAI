import LinkButton from "@src/components/ui/link-button";
import { setUser, useAppDispatch } from "@src/store";
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
      <LinkButton href="/user/">Profile</LinkButton>

      <Text onPress={logout}>Logout</Text>
    </>
  );
};

export default App;
