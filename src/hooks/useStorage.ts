import { useState, useEffect } from "react";
import { storageUtil } from "../utils/storageUtil";

export const useStorage = <T>(
  storage: Storage,
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = storageUtil.getItem<T>(storage, key);
    return item ?? initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    storageUtil.setItem(storage, key, value);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const item = storageUtil.getItem<T>(storage, key);
      if (item !== null) {
        setStoredValue(item);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, storage]);

  return [storedValue, setValue] as const;
};
