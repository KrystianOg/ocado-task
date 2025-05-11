import type { Price } from "../types";

export const sum = (prices: Price[]): Price => {
  const main = prices.reduce((acc, cur) => acc + cur.main, 0);
  const fractional = prices.reduce((acc, cur) => acc + cur.fractional, 0);

  // TODO: rename these
  const m = Math.floor(fractional / 100);
  const f = fractional % 100;

  return {
    main: main + m,
    fractional: f,
  };
};
