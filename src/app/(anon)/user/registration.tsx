import AppScrollView from "@src/components/app/app-scroll-view";
import LinkButton from "@src/components/ui/buttons/link-button";
import RegistrationForm from "@src/components/user/registration-form";

export default function RegistrationPage() {
  return (
    <AppScrollView>
      <RegistrationForm />
      <LinkButton href="/user/login" mode="text">
        Already have an account?
      </LinkButton>
    </AppScrollView>
  );
}
