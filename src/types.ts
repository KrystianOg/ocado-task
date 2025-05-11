export type Price = {
  main: number;
  fractional: number;
};

export type Product = {
  id: number;
  name: string;
  price: Price;
};
