import { AddEntryForm } from "./AddEntryForm";
import { TrainingCalendar } from "./TrainingCalendar";
import type { WeightEntry, WorkoutEntry } from '../../types'
import { useNavigate } from "react-router-dom";
import { WeightChart } from "../WeightChart";
import { useWeightStats } from "../../hooks/useWeightStats";
import "./HomePage.css";

export function HomePage({ entries, workouts, setEntries }: { entries: WeightEntry[], workouts: WorkoutEntry[], setEntries: React.Dispatch<React.SetStateAction<WeightEntry[]>> }) {
    const navigate = useNavigate();

    const { points } = useWeightStats(entries, "month")

    const handleAddEntry = (entry: Omit<WeightEntry, 'id'>) => {
        setEntries(prev => [
            ...prev,
            { ...entry, id: crypto.randomUUID() },
        ]);
    };

    const currentWeight = points.length 
        ? points[points.length - 1].weight
        : null


    const formattedWeight = ( weight: number | null ) => {
        if (!weight) return null
        
        const [intPart, fracPart ] = weight.toString().split('.');
        
        return { intPart, fracPart }
    }    

    const weightParts = formattedWeight(currentWeight)

    return (
        <div className="home-page">
            <h1>FitTrack</h1>

            <section>
                <h2>Текущий вес</h2>
                <div className="weight-overlay">
                    <p className="current-weight">
                        {weightParts ? (
                            <>
                                <span className="weight-int">{weightParts.intPart}</span>
                                <span className="weight-decimal">{weightParts.fracPart ? (`,${weightParts.fracPart}`) : null}</span>
                            </>
                        ) : "Нет данных"}
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
            <TrainingCalendar workoutDates={workouts.map(w => w.date)} />
        </div>
    );
}