import { useAppDimensions } from "@src/common/hooks";
import AppScrollView from "@src/components/app/app-scroll-view";
import ProfileForm from "@src/components/user/profile-form";
import { Platform } from "react-native";

export default function ProfilePage() {
  const { width } = useAppDimensions();

  return (
    <AppScrollView wide={Platform.OS === "web" && width > 720}>
      <ProfileForm />
    </AppScrollView>
  );
}
