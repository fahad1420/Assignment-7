"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function UpdateProfile() {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  if (!isPending && !session) {
    router.replace("/signin?reason=protected");
    return null;
  }
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const name = String(new FormData(e.currentTarget).get("name"));
    const res = await authClient.updateUser({ name });
    setLoading(false);
    if (res.error) return toast.error(res.error.message || "আপডেট করা যায়নি");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }
  return (
    <section className="auth-page profile-update-page">
      <div className="auth-card profile-update-card">
        <div className="profile-update-icon">
          <UserRound aria-hidden="true" />
        </div>
        <p className="kicker">আমার প্রোফাইল</p>
        <h1>তথ্য আপডেট</h1>
        <p>আপনার প্রদর্শিত নাম পরিবর্তন করুন।</p>
        <form onSubmit={submit}>
          <label>
            নাম
            <input
              name="name"
              required
              defaultValue={session?.user.name ?? ""}
            />
          </label>
          <button className="btn primary" disabled={loading}>
            {loading ? "আপডেট হচ্ছে..." : "আপডেট তথ্য"}
          </button>
        </form>
      </div>
    </section>
  );
}
