import type { Product } from "../types";

type CartItem = {
  product: Product;
  count: number;
};
type Cart = {
  items: CartItem[];
};

export const useCart = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Banany BIO",
      price: {
        main: 3,
        fractional: 49,
      },
    },
    {
      id: 2,
      name: "Mleko 3.2%",
      price: {
        main: 2,
        fractional: 89,
      },
    },
    {
      id: 3,
      name: "Chleb Żytni",
      price: {
        main: 4,
        fractional: 15,
      },
    },
    {
      id: 4,
      name: "Jaja 6 sztuk",
      price: {
        main: 6,
        fractional: 99,
      },
    },
    {
      id: 5,
      name: "Łosoś wędzony",
      price: {
        main: 5,
        fractional: 20,
      },
    },
  ];

  const cart: Cart = {
    items: products.map((product) => ({
      product,
      count: 1,
    })),
  };

  return cart;
};
