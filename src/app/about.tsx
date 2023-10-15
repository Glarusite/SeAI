import { router } from "expo-router";
import { Text, Button } from "react-native-paper";

const About: React.FC = () => {
  return (
    <>
      <Text>About</Text>
      <Button onPress={home}>Home</Button>
    </>
  );
};

export default About;

function home() {
  router.replace("/");
}
