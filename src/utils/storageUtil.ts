function getKey(key: string): string {
  return key;
}

export const storageUtil = {
  setItem: (storage: Storage, key: string, value: unknown) => {
    try {
      const serializedValue = JSON.stringify(value);
      storage.setItem(getKey(key), serializedValue);
    } catch (error) {
      console.error("Error setting item in storage", error);
    }
  },
  getItem: <T>(storage: Storage, key: string): T | null => {
    try {
      const serializedValue = storage.getItem(getKey(key));
      return serializedValue ? (JSON.parse(serializedValue) as T) : null;
    } catch (error) {
      console.error("Error getting item from storage", error);
      return null;
    }
  },
  removeItem: (storage: Storage, key: string) => {
    try {
      storage.removeItem(getKey(key));
    } catch (error) {
      console.error("Error removing item from storage", error);
    }
  },
};
