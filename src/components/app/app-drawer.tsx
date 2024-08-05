import { useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { SafeAreaView, StyleSheet } from "react-native";

import Navigation from "../ui/navigation";
import PageTitle from "../ui/page-title";
import ToggleThemeSwitch from "../ui/toggle-theme-switch";

import AppScrollView from "./app-scroll-view";

export default function AppDrawer() {
  const segments = useSegments();
  return (
    <Drawer
      drawerContent={() => (
        <SafeAreaView style={styles.scrollContainer}>
          <AppScrollView>
            <PageTitle>SeAI Menu</PageTitle>
            <ToggleThemeSwitch />
            {segments[0] !== "(anon)" && segments[1] != null && <Navigation />}
          </AppScrollView>
        </SafeAreaView>
      )}
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
    />
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
  },
});

// function RoleDropDown() {
//   const dispatch = useAppDispatch();
//   const role = useAppSelector(state => state.user.role) || "SEAFARER";

//   const setValue = useCallback<DropDownProps["setValue"]>(
//     (value: User["role"]) => dispatch(setUserValue({ key: "role", value })),
//     [dispatch],
//   );

//   return <DropDown label="Role" mode="outlined" value={role} setValue={setValue} list={roleList} />;
// }

// const roleList: DropDownList<User["role"]> = [
//   { label: "Seafarer", value: "SEAFARER" },
//   { label: "Training Center Admin", value: "TRAINING_CENTER_ADMIN" },
//   { label: "Training Center User", value: "TRAINING_CENTER_USER" },
// ];
