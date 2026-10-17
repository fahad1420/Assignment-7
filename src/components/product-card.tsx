import Link from "next/link";
import type { Product } from "@/lib/types";
import { bnNumber, unitLabel } from "@/lib/format";
export function ChangeBadge({ product }: { product: Product }) {
  const d = product.change.dir;
  return (
    <span className={`badge ${d}`}>
      {d === "up" ? "▲" : d === "down" ? "▼" : "•"}{" "}
      {bnNumber(Math.abs(product.change.pct))}%
    </span>
  );
}
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link className="product-card" href={`/product/${product.slug}`}>
      <div className="product-emoji">{product.image}</div>
      <div>
        <span className="category-label">{product.categoryNameBn}</span>
        <h3>{product.nameBn}</h3>
        <p className="muted">{unitLabel(product.unit)}</p>
      </div>
      <div className="price-line">
        <div>
          <small>আজকের দাম</small>
          <strong>{bnNumber(product.today)} টাকা</strong>
        </div>
        <ChangeBadge product={product} />
      </div>
    </Link>
  );
}
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
