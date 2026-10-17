import Link from "next/link";
export default function NotFound() {
  return (
    <section className="not-found container">
      <div>🛒</div>
      <p className="kicker">৪০৪ • পৃষ্ঠা পাওয়া যায়নি</p>
      <h1>দুঃখিত, এই পাতাটি নেই</h1>
      <p>লিংকটি ভুল হতে পারে অথবা তথ্যটি সরিয়ে নেওয়া হয়েছে।</p>
      <Link className="btn primary" href="/">
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
