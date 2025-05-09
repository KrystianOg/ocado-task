import { useState, useCallback } from "react";

export const useSessionStorage = <T>(
  key: string,
  initialValue: T | (() => T),
) => {
  const [value, _setValue] = useState<T>(() => getItem());

  const getItem = (): T => {
    const item = window.sessionStorage.getItem(key);

    if (item === null) {
      const defaultValue =
        initialValue instanceof Function ? initialValue() : initialValue;

      return defaultValue;
    }

    return JSON.parse(item) as T;
  };

  const setItem = useCallback(
    (newValue: T): void => {
      const item = JSON.stringify(newValue);
      window.sessionStorage.setItem(key, item);
    },
    [key],
  );

  const setValue = useCallback(
    (value: T) => {
      setItem(value);
      _setValue(value);
    },
    [setItem],
  );

  return [value, setValue];
};
