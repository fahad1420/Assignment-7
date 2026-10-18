"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function UpdateProfileForm({ currentName }: { currentName: string }) {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("নাম ফাঁকা রাখা যাবে না");
      return;
    }

    setLoading(true);
    const res = await authClient.updateUser({ name: trimmed });
    setLoading(false);

    if (res.error) {
      return toast.error(res.error.message || "আপডেট করা যায়নি");
    }

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
          <label htmlFor="name-input">
            নাম
            <input
              id="name-input"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পূর্ণ নাম"
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

export default function UpdateProfile() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <section className="auth-page profile-update-page">
        <div className="auth-card profile-update-card">
          <div className="skeleton" style={{ height: 48, width: 48, borderRadius: "50%", margin: "0 auto 16px" }} />
          <div className="skeleton" style={{ height: 28, width: 140, margin: "0 auto 8px" }} />
          <div className="skeleton" style={{ height: 16, width: 220, margin: "0 auto 24px" }} />
          <div className="skeleton" style={{ height: 44, width: "100%", borderRadius: 8 }} />
        </div>
      </section>
    );
  }

  if (!session) {
    router.replace("/signin?reason=protected");
    return null;
  }

  return <UpdateProfileForm key={session.user.id} currentName={session.user.name || ""} />;
}
