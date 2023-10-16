import LinkButton from "@src/components/ui/link-button";
import LogoImage from "@src/components/ui/logo-image";
import LoginForm from "@src/components/user/login-form";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const Login: React.FC = () => {
  return (
    <>
      <LogoImage />
      <Text style={styles.titleText}>SeAI</Text>

      <LoginForm />

      <LinkButton href="/user/register">Register</LinkButton>

      <LinkButton href="/about">About</LinkButton>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 48,
    fontFamily: "Impact",
    alignSelf: "center",
  },
});
