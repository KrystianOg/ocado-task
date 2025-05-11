import type { Price } from "../types";

export function formatPrice(price: Price): string {
  const fractional = price.fractional.toString().padStart(2, "0");
  return `${price.main}.${fractional}`;
}
