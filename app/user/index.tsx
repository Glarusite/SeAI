import { Link } from "expo-router";
import { Text } from "react-native-paper";

const Profile: React.FC = () => {
  return (
    <>
      <Text>Profile</Text>
      <Link href="/">
        <Text>Home</Text>
      </Link>
    </>
  );
};

export default Profile;
