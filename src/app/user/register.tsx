import LinkButton from "@src/components/ui/buttons/link-button";
import { TitleText } from "@src/components/ui/title-text";
import RegisterForm from "@src/components/user/register-form";

export default function RegisterPage() {
  return (
    <>
      <TitleText>Register, Seaman!</TitleText>
      <RegisterForm />
      <LinkButton href="/user/login" mode="text">
        Already have an account?
      </LinkButton>
    </>
  );
}
