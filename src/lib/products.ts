import type { Category, Product } from "./types";

const API_BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
  "https://api-store-indol.vercel.app/api/bazardor",
  "https://openapi.programming-hero.com/api/bazardor",
] as const;

async function request<T>(path: string): Promise<T> {
  for (const baseURL of API_BASE_URLS) {
    try {
      const response = await fetch(baseURL + path, {
        next: { revalidate: 300 },
      });

      if (!response.ok) continue;

      return (await response.json()) as T;
    } catch {
      // Try the next API when this source is unavailable or returns invalid JSON.
    }
  }

  throw new Error("দামের তথ্য পাওয়া যায়নি");
}

export const getProducts = () => request<Product[]>("/products");
export const getCategories = () => request<Category[]>("/categories");

export async function getProduct(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug || String(p.id) === slug);
}

export async function getCategory(slug: string) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return {
    category: categories.find((c) => c.slug === slug),
    products: products.filter((p) => p.category === slug),
  };
}
