import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

export default function AppDrawerMenu() {
  const navigation = useNavigation();
  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());
  return <IconButton style={styles.button} icon="menu" onPress={openDrawer} />;
}

const styles = StyleSheet.create({
  button: {
    paddingBottom: Platform.OS === "ios" ? 6 : undefined,
  },
});
