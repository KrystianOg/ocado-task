import { LocalStorageKeys } from "../constants";
import type { CartItem } from "../types";
import { storageUtil } from "./storageUtil";

export interface Order {
  items: CartItem[];
  id: string;
}

/**
 * @returns newly created order
 */
export function createOrder(items: CartItem[]): Order {
  const newOrder = {
    items,
    id: window.crypto.randomUUID(),
  };

  const orders =
    storageUtil.getItem<Order[]>(
      window.localStorage,
      LocalStorageKeys.ORDERS,
    ) ?? [];

  orders.push(newOrder);

  // some way of storing data, it should be handled by backend
  storageUtil.setItem(localStorage, LocalStorageKeys.ORDERS, orders);

  return newOrder;
}

export function findOrder(id: string): Order | undefined {
  const orders = storageUtil.getItem<Order[]>(
    window.localStorage,
    LocalStorageKeys.ORDERS,
  );

  if (orders === null || orders.length === 0) {
    return;
  }

  return orders.find((order) => order.id === id);
}
