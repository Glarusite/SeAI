import { router } from "expo-router";
import { Button, Text } from "react-native-paper";

const Register: React.FC = () => {
  return (
    <>
      <Text>Register</Text>
      <Button onPress={login}>Already have an account?</Button>
    </>
  );
};

export default Register;

function login() {
  router.replace("/user/login");
}
