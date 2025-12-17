import { useState, useEffect } from 'react'
import type { WeightEntry } from './types'
import { AddEntryForm } from "./AddEntryForm";
import './App.css'

const STORAGE_KEY = 'weightEntries'

function App() {
    const [entries, setEntries] = useState<WeightEntry[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            return [];
        }

        try {
            return JSON.parse(stored) as WeightEntry[];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }, [entries]);

    const handleAddEntry = (entry: Omit<WeightEntry, 'id'>) => {
        setEntries(prev => [
            ...prev,
            { ...entry, id: crypto.randomUUID() },
        ]);
    };

    const currentWeight = entries.length
        ? entries[entries.length - 1].weight
        : null;

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
            <h1>Fitness Tracker</h1>

            <section>
                <h2>Текущий вес</h2>
                <p style={{ fontSize: 32, fontWeight: 600 }}>
                    {currentWeight !== null ? `${currentWeight} кг` : "Нет данных"}
                </p>
            </section>

            <section>
                <h2>Добавить запись</h2>
                <AddEntryForm onAddEntry={handleAddEntry} />
            </section>

            {/* Сюда позже подключим компонент графика WeightChart */}
        </div>
    )
}

export default App
