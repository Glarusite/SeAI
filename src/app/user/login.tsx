import LinkButton from "@src/components/ui/buttons/link-button";
import LogoImage from "@src/components/ui/logo-image";
import LoginForm from "@src/components/user/login-form";

export default function LoginPage() {
  return (
    <>
      <LogoImage title="SeAI" />
      <LoginForm />
      <LinkButton href="/user/register" mode="contained-tonal">
        Register
      </LinkButton>
      <LinkButton href="/about">About</LinkButton>
    </>
  );
}
