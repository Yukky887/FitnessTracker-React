import { useState } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Ошибка чтения из localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value: React.SetStateAction<T>) => {
        try {
            const valueToStore = value instanceof Function 
                ? value(storedValue) 
                : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.warn(`Ошибка добавления в localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
}