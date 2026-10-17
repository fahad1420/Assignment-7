"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductGrid } from "./product-card";
export function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("default");
  const shown = useMemo(
    () =>
      [...products].sort((a, b) =>
        sort === "low"
          ? a.today - b.today
          : sort === "high"
            ? b.today - a.today
            : 0,
      ),
    [products, sort],
  );
  return (
    <>
      <label className="sorter">
        সাজান:{" "}
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </label>
      <ProductGrid products={shown} />
    </>
  );
}
