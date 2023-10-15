import LogoImage from "@src/components/ui/logo-image";
import LoginForm from "@src/components/user/login-form";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

const Login: React.FC = () => {
  return (
    <>
      <LogoImage />
      <Text style={styles.titleText}>SeAI</Text>

      <LoginForm />

      <Button mode="outlined" onPress={() => router.replace("/user/register")}>
        Register
      </Button>

      <Button mode="outlined" onPress={() => router.replace("/about")}>
        About
      </Button>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    width: "100%",
    maxWidth: 480,
    justifyContent: "center",
  },

  titleText: {
    fontSize: 48,
    fontFamily: "Impact",
    alignSelf: "center",
  },
});
