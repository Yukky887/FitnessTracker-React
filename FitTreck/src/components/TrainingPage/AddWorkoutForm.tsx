import { useState } from "react";
import type { ISODate, WorkoutEntry, WorkoutType } from "../../types";
import "./AddWorkoutForm.css";

interface AddWorkoutFormProps {
    date: ISODate;
    onAddWorkout: (workout: Omit<WorkoutEntry, "id">) => void;
    existingTypes?: string[];
}

export function AddWorkoutForm({ date, onAddWorkout, existingTypes = [] }: AddWorkoutFormProps) {
    const [note, setNote] = useState<string>("");
    const [type, setType] = useState<WorkoutType>("Силовая");
    const [completed, setCompleted] = useState<boolean>(false)

    const workoutTypes: WorkoutType[] = ["Силовая", "Кардио", "Другое"];

    const availableTypes = workoutTypes.filter(t => !existingTypes.includes(t))

    if (existingTypes.includes(type) && availableTypes.length > 0) {
        setType(availableTypes[0]);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (existingTypes.includes(type)) {
            alert(`${type} тренировка, уже существует на эту дату`)
        }

        onAddWorkout({
            date,
            type,
            notes: note.trim() || "",
            completed,
            exercises: [],
        })

        setType(type);
        setCompleted(false);
    };
    
    if (availableTypes.length === 0) {
        return (
            <div className="workout-from__message">
                <p>Все типы тренировок уже добавлены на эту дату</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="workout-form">
            <select
                value={type}
                onChange={e => setType(e.target.value as WorkoutType)}
                className="workout-form__select"
            >
                {workoutTypes.map(workoutTypes => (
                    <option
                        key={workoutTypes}
                        value={workoutTypes}
                        disabled={existingTypes.includes(workoutTypes)}
                    >
                        {workoutTypes} {existingTypes.includes(workoutTypes) ? "(уже было выполнено сегодня)" : ""}
                    </option>
                ))}
            </select>
            <textarea
                placeholder="Заметка"
                value={note} onChange={e => setNote(e.target.value)}
                className="workout-form__textarea"
            />
            <label className="workout-form__checkbox-label">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={e => setCompleted(e.target.checked)}
                    className="workout-form__checkbox"
                />
                Выполнена
            </label>
            <button 
                className="workout-form__button" 
                type="submit"
                disabled={existingTypes.includes(type)}        
            >
                {existingTypes.includes(type)
                    ? "Этот тип уже добавлен"
                    : "Добавить тренировку"}
            </button>
        </form>
    );
}