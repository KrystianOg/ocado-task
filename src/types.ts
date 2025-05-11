export interface Price {
  main: number;
  fractional: number;
}

export interface Product {
  id: number;
  name: string;
  price: Price;
}

export type CartItem = Product & {
  quantity: number;
};

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: Price;
}
