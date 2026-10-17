import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/products";
import { CategoryProducts } from "@/components/category-products";
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { category, products } = await getCategory(slug);
  if (!category) notFound();
  return (
    <section className="container section category-page">
      <div className="page-title">
        <span>{category.icon}</span>
        <div>
          <p className="kicker">বিভাগ</p>
          <h1>{category.nameBn}</h1>
          <p>
            {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও
            পরিবর্তন
          </p>
        </div>
      </div>
      {products.length ? (
        <CategoryProducts products={products} />
      ) : (
        <div className="empty">
          <h2>কোনো পণ্য পাওয়া যায়নি</h2>
          <Link className="btn primary" href="/">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </section>
  );
}
