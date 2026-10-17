import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product-card";
export default async function Home() {
  const products = await getProducts();
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">আজকের বাজার • এক নজরে</span>
            <h1>
              নিত্যপণ্যের সঠিক দাম,
              <br />
              <span>সিদ্ধান্ত হোক সহজ</span>
            </h1>
            <p>
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম:
              সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <Link className="btn primary hero-btn" href="#all-products">
              সব পণ্য দেখুন <ArrowDown size={18} />
            </Link>
            <div className="hero-stats">
              <span>
                <b>{products.length.toLocaleString("bn-BD")}</b> টি নিত্যদিনের
                পণ্য
              </span>
              <span>
                <b>১২</b> টি বাজার অন্তর্ভুক্ত
              </span>
              <span>
                <b>৮</b> টি বিভাগের তথ্য
              </span>
            </div>
          </div>
          <div className="hero-art">
            <span className="orb one" />
            <span className="orb two" />
            <Image
              src="/assets/bazar-hero.png"
              width={430}
              height={430}
              alt="বাজারের পণ্যের ঝুড়ি"
              priority
            />
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="kicker up">▲ মূল্য বৃদ্ধি</span>
            <h2>আজ দাম বেড়েছে</h2>
          </div>
        </div>
        <ProductGrid products={risers} />
      </section>
      <section className="section soft">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="kicker down">▼ মূল্য হ্রাস</span>
              <h2>আজ দাম কমেছে</h2>
            </div>
          </div>
          <ProductGrid products={fallers} />
        </div>
      </section>
      <section id="all-products" className="container section">
        <div className="section-heading">
          <div>
            <span className="kicker">পণ্যের তালিকা</span>
            <h2>সব পণ্য</h2>
            <p>
              মোট {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও
              পরিবর্তন
            </p>
          </div>
        </div>
        <ProductGrid products={products} />
      </section>
    </>
  );
}
