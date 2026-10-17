import type { Product } from "./types";
export const bnNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 1 }).format(value);
export const unitLabel = (unit: Product["unit"]) =>
  ({
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  })[unit];
export const banglaDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
