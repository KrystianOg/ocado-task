import type { Price } from "../types";

export function formatPrice(price: Price): string {
  return `${price.main}.${price.fractional}`;
}
