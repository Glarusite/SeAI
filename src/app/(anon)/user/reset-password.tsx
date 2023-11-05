import AppScrollView from "@src/components/app/app-scroll-view";
import LinkButton from "@src/components/ui/buttons/link-button";
import ResetPasswordForm from "@src/components/user/reset-password-form";

export default function PasswordResetPage() {
  return (
    <AppScrollView>
      <ResetPasswordForm />
      <LinkButton href="/user/login" mode="text">
        Retry with old password?
      </LinkButton>
    </AppScrollView>
  );
}
