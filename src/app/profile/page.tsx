import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Mail, UserRound } from "lucide-react";
import { auth } from "@/lib/auth";
import { ensureMongoConnection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export default async function Profile() {
  await ensureMongoConnection();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=protected");
  const u = session.user;
  return (
    <section className="container section profile-page">
      <div className="profile-card">
        <div className="avatar">
          {u.image ? (
            <Image
              src={u.image}
              width={94}
              height={94}
              alt={u.name || "প্রোফাইল ছবি"}
            />
          ) : (
            <UserRound />
          )}
        </div>
        <p className="kicker">আমার প্রোফাইল</p>
        <h1>{u.name}</h1>
        <p>
          <Mail size={16} />
          {u.email}
        </p>
        <div className="profile-info">
          <span>
            <small>নাম</small>
            <b>{u.name}</b>
          </span>
          <span>
            <small>ইমেইল</small>
            <b>{u.email}</b>
          </span>
        </div>
        <Link className="btn primary" href="/profile/update">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </section>
  );
}
