import { useState, useEffect } from 'react';

/**
 * Drop-in replacement for useState that persists to localStorage.
 * On first load, seeds from initialValue if no stored data exists.
 */
export function usePersistedState<T>(key: string, initialValue: T) {
    const [state, setState] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? (JSON.parse(stored) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch {
            // localStorage unavailable (private browsing quota, etc.) — fail silently
        }
    }, [key, state]);

    return [state, setState] as const;
}