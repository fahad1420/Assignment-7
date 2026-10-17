import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ensureMongoConnection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await ensureMongoConnection();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=protected");
  return children;
}
