import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

const UserLayout: React.FC = () => {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
};

export default UserLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    width: "100%",
    maxWidth: 480,
  },
});
