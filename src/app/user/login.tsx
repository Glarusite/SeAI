import LinkButton from "@src/components/ui/link-button";
import LogoImage from "@src/components/ui/logo-image";
import LoginForm from "@src/components/user/login-form";

export default function Login() {
  return (
    <>
      <LogoImage title="SeAI" />
      <LoginForm />
      <LinkButton href="/user/register">Register</LinkButton>
      <LinkButton href="/about">About</LinkButton>
    </>
  );
}
