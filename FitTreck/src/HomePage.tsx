import { AddEntryForm } from "./AddEntryForm";
import { AddGraphic } from "./AddGraphic";
import { TrainingCalendar } from "./TrainingCalendar";
import { useState, useEffect } from 'react'
import type { WeightEntry } from './types'

const STORAGE_KEY = 'weightEntries';

export function HomePage({entries, setEntries}: {entries: WeightEntry[], setEntries: React.Dispatch<React.SetStateAction<WeightEntry[]>>}) {
    

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
        <div className="home-page" style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
            <h1>FitTrack</h1>

            <section>
                <h2>Текущий вес</h2>
                <p style={{ fontSize: 32, fontWeight: 600 }}>
                    {currentWeight !== null ? `${currentWeight} кг` : "Нет данных"}
                </p>
                <AddGraphic entries={entries} />
            </section>

            <section>
                <details>
                    <summary>Добавить запись</summary>
                    <AddEntryForm onAddEntry={handleAddEntry} />
                </details>
            </section>
            <TrainingCalendar workoutDates={["2025-12-19", "2025-12-18", "2025-12-15"]} />
        </div>
    );
}