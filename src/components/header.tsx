"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { bnNumber } from "@/lib/format";
import toast from "react-hot-toast";

const subscribe = () => () => {};
const getDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

const categories = [
  ["chal", "চাল"],
  ["dal", "ডাল"],
  ["tel", "তেল"],
  ["sobji", "সবজি"],
  ["mach", "মাছ"],
  ["mangsho", "মাংস"],
  ["dim-dui", "ডিম-দুধ"],
  ["mosla", "মসলা"],
];

interface TickerItem {
  emoji: string;
  name: string;
  price: number;
  unit: string;
  dir: "up" | "down" | "flat";
  pct: number;
}

const initialTickerItems: TickerItem[] = [
  { emoji: "🍚", name: "মিনিকেট চাল", price: 99, unit: "কেজি", dir: "down", pct: 2.9 },
  { emoji: "🧅", name: "পেঁয়াজ", price: 68, unit: "কেজি", dir: "up", pct: 4.6 },
  { emoji: "🥚", name: "ডিম", price: 158, unit: "ডজন", dir: "up", pct: 3.9 },
  { emoji: "🧄", name: "রসুন", price: 125, unit: "কেজি", dir: "down", pct: 7.4 },
  { emoji: "🫚", name: "আদা", price: 85, unit: "কেজি", dir: "up", pct: 9.0 },
  { emoji: "🐟", name: "রুই মাছ", price: 340, unit: "কেজি", dir: "down", pct: 2.1 },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [tickerItems, setTickerItems] = useState<TickerItem[]>(initialTickerItems);
  const date = useSyncExternalStore(subscribe, getDate, () => "আজকের বাজার");
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          const movers = data
            .filter((p) => p.change && p.change.pct !== 0)
            .slice(0, 10)
            .map((p) => ({
              emoji: p.image || "🛒",
              name: p.nameBn,
              price: p.today,
              unit:
                p.unit === "kg"
                  ? "কেজি"
                  : p.unit === "litre"
                    ? "লিটার"
                    : p.unit === "dozen"
                      ? "ডজন"
                      : "পিস",
              dir: (p.change.dir as "up" | "down" | "flat") || "flat",
              pct: Math.abs(p.change.pct),
            }));
          if (movers.length) setTickerItems(movers);
        }
      })
      .catch(() => {
        // Retain fallback items if API is unreachable
      });
  }, []);

  async function logout() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  }

  return (
    <header className="site-header">
      <div className="topbar container">
        <Link href="/" className="brand">
          <Image src="/assets/logo-icon.png" width={34} height={34} alt="" />
          <span>
            <b>বাজার দর</b>
            <small suppressHydrationWarning>{date}</small>
          </span>
        </Link>
        <nav className="desktop-nav">
          <Link className={pathname === "/" ? "active" : undefined} href="/">
            হোম
          </Link>
          {categories.map(([s, n]) => (
            <Link
              className={pathname === `/category/${s}` ? "active" : undefined}
              key={s}
              href={`/category/${s}`}
            >
              {n}
            </Link>
          ))}
        </nav>
        <div className="auth-actions">
          {!isPending && session ? (
            <>
              <Link className="btn ghost" href="/profile">
                প্রোফাইল
              </Link>
              <button className="btn primary" onClick={logout}>
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link className="btn ghost" href="/signin">
                সাইন ইন
              </Link>
              <Link className="btn primary" href="/signup">
                সাইন আপ
              </Link>
            </>
          )}
          <button
            className="menu-btn"
            aria-label="মেনু"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav">
          <Link
            href="/"
            className={pathname === "/" ? "active" : undefined}
            onClick={() => setOpen(false)}
          >
            হোম
          </Link>
          {session && (
            <Link href="/profile" onClick={() => setOpen(false)}>
              প্রোফাইল
            </Link>
          )}
          {categories.map(([s, n]) => (
            <Link
              onClick={() => setOpen(false)}
              key={s}
              href={`/category/${s}`}
            >
              {n}
            </Link>
          ))}
        </nav>
      )}
      <div className="ticker">
        <div>
          {tickerItems.map((item, i) => (
            <span key={i} className="ticker-item">
              {item.emoji} {item.name} {bnNumber(item.price)} টাকা/{item.unit}{" "}
              {item.dir === "up" ? (
                <b>▲ {bnNumber(item.pct)}%</b>
              ) : item.dir === "down" ? (
                <em>▼ {bnNumber(item.pct)}%</em>
              ) : (
                <span>• ০.০%</span>
              )}
              {"　"}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
