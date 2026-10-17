export type Direction = "up" | "down" | "flat";
export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}
export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: "kg" | "litre" | "dozen" | "piece";
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: Direction; pct: number };
  markets: Market[];
}
export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}
