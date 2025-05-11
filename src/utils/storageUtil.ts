export enum LocalStorageKeys {
  ORDERS = "orders",
  CART = "cart",
}

export enum SessionStorageKeys {
  EXAMPLE = "example",
}

export const storageUtil = {
  setItem: (storage: Storage, key: string, value: unknown) => {
    try {
      const serializedValue = JSON.stringify(value);
      storage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error setting item in storage", error);
    }
  },
  getItem: <T>(storage: Storage, key: string): T | null => {
    try {
      const serializedValue = storage.getItem(key);
      return serializedValue ? (JSON.parse(serializedValue) as T) : null;
    } catch (error) {
      console.error("Error getting item from storage", error);
      return null;
    }
  },
  removeItem: (storage: Storage, key: string) => {
    try {
      storage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from storage", error);
    }
  },
};
