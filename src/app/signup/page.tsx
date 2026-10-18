import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "সাইন আপ - বাজার দর",
  description: "বাজার দরে বিনামূল্যে নতুন অ্যাকাউন্ট তৈরি করুন।",
};
export default function SignUp() {
  return (
    <section className="auth-page">
      <AuthForm mode="signup" />
    </section>
  );
}
