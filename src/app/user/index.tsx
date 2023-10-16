import { router } from "expo-router";
import { Button, Text } from "react-native-paper";

const Profile: React.FC = () => {
  return (
    <>
      <Text>Profile</Text>
      <Button onPress={() => router.replace("/")}>Home</Button>
    </>
  );
};

export default Profile;
