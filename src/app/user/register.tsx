import LinkButton from "@src/components/ui/link-button";
import RegisterForm from "@src/components/user/register-form";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const Register: React.FC = () => {
  return (
    <>
      <Text style={styles.titleText}>Register, Seaman!</Text>
      <RegisterForm />
      <LinkButton href="/user/login" mode="text">
        Already have an account?
      </LinkButton>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 36,
    alignSelf: "center",
  },
});
