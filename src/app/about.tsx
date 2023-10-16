import LinkButton from "@src/components/ui/link-button";
import { Text } from "react-native-paper";

const About: React.FC = () => {
  return (
    <>
      <Text>About</Text>
      <LinkButton href="/">Home</LinkButton>
    </>
  );
};

export default About;
