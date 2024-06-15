import { Platform } from "react-native";
import { Button } from "react-native-paper";

import { showFeatureInDevelopmentToast } from "@src/common/toast";
import AppScrollView from "@src/components/app/app-scroll-view";
import LinkButton from "@src/components/ui/buttons/link-button";
import LogoImage from "@src/components/ui/logo-image";
import LoginForm from "@src/components/user/login-form";

export default function LoginPage() {
  return (
    <AppScrollView>
      <LogoImage title="SeAI" />
      <LoginForm />
      <LinkButton href="/user/registration" icon="account-plus" mode="contained-tonal">
        Create new account
      </LinkButton>
      {Platform.OS === "web" && (
        <Button onPress={showFeatureInDevelopmentToast} mode="text">
          Forgot password?
        </Button>
      )}
    </AppScrollView>
  );
}
