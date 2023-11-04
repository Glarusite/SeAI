import LinkButton from "@src/components/ui/buttons/link-button";
import { PageTitle } from "@src/components/ui/page-title";
import RegisterForm from "@src/components/user/register-form";

export default function RegisterPage() {
  return (
    <>
      <PageTitle>Register, Seaman!</PageTitle>
      <RegisterForm />
      <LinkButton href="/user/login" mode="text">
        Already have an account?
      </LinkButton>
    </>
  );
}
