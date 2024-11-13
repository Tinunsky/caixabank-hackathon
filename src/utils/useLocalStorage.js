import { useEffect } from 'react';

export function useLocalStorage(store, key) {
    useEffect(() => {
        try {
            const storedData = localStorage.getItem(key);
            if (storedData) {
                store.set(JSON.parse(storedData));
            }
        } catch (error) {
            console.error(`Error loading data from localStorage for key "${key}":`, error);
            localStorage.removeItem(key);
        }

        const unsubscribe = store.subscribe((value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error(`Error saving data to localStorage for key "${key}":`, error);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [store, key]);
}
