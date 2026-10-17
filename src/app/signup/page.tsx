import { AuthForm } from "@/components/auth-form";
export default function SignUp() {
  return (
    <section className="auth-page">
      <AuthForm mode="signup" />
    </section>
  );
}
