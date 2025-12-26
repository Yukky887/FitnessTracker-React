import { useState, useEffect } from "react";
import type { WeightEntry } from "../types";

const STORAGE_KEY = 'weightEntries';

export function useWeightEntries() {
    const [entries, setEntries] = useState<WeightEntry[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }, [entries]);

    return { entries, setEntries };
}