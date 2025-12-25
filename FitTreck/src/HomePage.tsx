import { AddEntryForm } from "./AddEntryForm";
import { TrainingCalendar } from "./TrainingCalendar";
import { useEffect } from 'react'
import type { WeightEntry } from './types'
import { useNavigate } from "react-router-dom";
import { WeightChart } from "./WeightChart";
import { useWeightStats } from "./useWeightStats";
import "./HomePage.css";

const STORAGE_KEY = 'weightEntries';

export function HomePage({ entries, setEntries }: { entries: WeightEntry[], setEntries: React.Dispatch<React.SetStateAction<WeightEntry[]>> }) {
    const navigate = useNavigate();

    const { points } = useWeightStats(entries, "month")

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }, [entries]);

    const handleAddEntry = (entry: Omit<WeightEntry, 'id'>) => {
        setEntries(prev => [
            ...prev,
            { ...entry, id: crypto.randomUUID() },
        ]);
    };

    const currentWeight = points.length
        ? points[points.length - 1].weight
        : null;



    return (
        <div className="home-page">
            <h1>FitTrack</h1>

            <section>
                <h2>Текущий вес</h2>
                <div className="weight-overlay">
                    <p className="current-weight">
                        {currentWeight !== null ? `${currentWeight}` : "Нет данных"}
                    </p>
                    {points.length <= 2 ? (
                        <p>Недостаточно данных для графика</p>
                    ) : (
                        <WeightChart
                            data={points}
                            onClick={() => navigate("/weight-stats")}
                            showAxis={false}
                            className="add-graphic-container clickable"
                            width={400}
                            height={300}
                        />
                    )}
                </div>
            </section>

            <section>
                <details className="entry-form-container">
                    <summary>Добавить запись</summary>
                    <AddEntryForm onAddEntry={handleAddEntry} />
                </details>
            </section>
            <TrainingCalendar workoutDates={["2025-12-19", "2025-12-18", "2025-12-15"]} />
        </div>
    );
}