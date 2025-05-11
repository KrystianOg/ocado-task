import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../types";
import { sum } from "../utils/currency";
import type { CartItem, CartContextType } from "../types";
import { LocalStorageKeys } from "../constants";
import { storageUtil } from "../utils/storageUtil";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const storedCart = storageUtil.getItem<CartItem[]>(
      window.localStorage,
      LocalStorageKeys.CART,
    );

    return storedCart ?? [];
  });

  useEffect(() => {
    storageUtil.setItem(window.localStorage, LocalStorageKeys.CART, items);
  }, [items]);

  const clearCart = () => {
    setItems([]);
  };

  const total = sum(
    items.map((item) => ({
      main: item.price.main * item.quantity,
      fractional: item.price.fractional * item.quantity,
    })),
  );

  const addItem = (product: Product) => {
    const newItems = [...items];
    const updatedProduct = newItems.find((item) => item.id === product.id);

    if (updatedProduct) {
      updatedProduct.quantity += 1;
    } else {
      newItems.push({ ...product, quantity: 1 });
    }

    setItems(newItems);
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    const product = items.find((item) => item.id === id);

    if (!product) return;

    product.quantity = quantity;

    if (product.quantity < 0) {
      product.quantity = 0;
    }

    setItems([...items]);
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
  };

  return <CartContext.Provider value={value}>{children} </CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
