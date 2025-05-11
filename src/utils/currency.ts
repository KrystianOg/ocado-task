import type { Price } from "../types";

const normalize = (main: number, fractional: number): Price => {
  const totalFractional = main * 100 + fractional;
  return {
    main: Math.floor(totalFractional / 100),
    fractional: totalFractional % 100,
  };
};

export const sum = (prices: Price[]): Price => {
  const total = prices.reduce<Price>(
    (acc, cur) => ({
      main: acc.main + cur.main,
      fractional: acc.fractional + cur.fractional,
    }),
    { main: 0, fractional: 0 },
  );

  return normalize(total.main, total.fractional);
};

export const mult = (price: Price, mult: number): Price => {
  return normalize(price.main * mult, price.fractional * mult);
};
