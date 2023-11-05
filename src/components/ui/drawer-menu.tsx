import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { IconButton } from "react-native-paper";

export default function DrawerMenu() {
  const navigation = useNavigation();
  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());
  return <IconButton icon="menu" onPress={openDrawer} />;
}
