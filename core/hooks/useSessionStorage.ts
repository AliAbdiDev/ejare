// hooks/useSessionStorage.ts
'use client';

import { useState, useEffect, useCallback } from "react";

/**
 * A lightweight, generic hook for managing data in `sessionStorage`.
 * 
 * - Data persists only until the browser tab is closed.
 * - Fully type-safe and independent of any feature.
 * - Automatically loads stored value on mount.
 * 
 * @param key - Unique key for the session storage item
 * @param initialValue - Default value if nothing is stored
 * 
 * @returns `{ value, setValue }`
 *   - `value`: Current stored value (or `initialValue`)
 *   - `setValue`: Update value and persist to `sessionStorage`
 * 
 * @example
 * ```tsx
 * // Store a string
 * const { value: theme, setValue: setTheme } = useSessionStorage("theme", "dark");
 * 
 * // Store an object
 * const { value: cart, setValue: setCart } = useSessionStorage<CartItem[]>("cart", []);
 * 
 * // Update
 * setCart(prev => [...prev, newItem]);
 * ```
 */
export const useSessionStorage = <T,>(
  key: string,
  initialValue: T
): { value: T; setValue: (value: T | ((val: T) => T)) => void } => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Load from sessionStorage on mount
  useEffect(() => {
    if (!key) {
      console.error("useSessionStorage: key is required and must be a non-empty string.");
      return;
    }

    try {
      const item = sessionStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`useSessionStorage: Failed to read "${key}" from sessionStorage.`, error);
    }
  }, [key]);

  // Save to sessionStorage on change
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        sessionStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`useSessionStorage: Failed to write "${key}" to sessionStorage.`, error);
      }
    },
    [key, storedValue]
  );

  return { value: storedValue, setValue };
};