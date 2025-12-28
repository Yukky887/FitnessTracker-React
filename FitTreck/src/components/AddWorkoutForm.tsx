import { useState } from "react";
import dayjs from "dayjs";
import type { WorkoutEntry, WorkoutType } from "../types";
import "./AddWorkoutForm.css";

interface AddWorkoutFormProps {
    defaultDate?: string;
    onAddWorkout: (workout: Omit<WorkoutEntry, "id">) => void;
}

export function AddWorkoutForm({ defaultDate, onAddWorkout }: AddWorkoutFormProps) {
    const [date, setDate] = useState<string>(
        defaultDate || dayjs().format("YYYY-MM-DD")
    );
    const [note, setNote] = useState<string>("");
    const [type, setType] = useState<WorkoutType>("Силовая");
    const [completed, setCompleted] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onAddWorkout({
            date,
            type,
            notes: note.trim() || "",
            completed,
        })

        setNote("");
        setType("Силовая");
        setCompleted(false);
    };

    return (
        <form onSubmit={handleSubmit} className="workout-form">
            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="workout-form__input workout-form__date"
            />
            <select
                value={type}
                onChange={e => setType(e.target.value as WorkoutType)}
                className="workout-form__select"
            >
                <option value="Силовая">Силовая</option>
                <option value="Кардио">Кардио</option>
                <option value="Йога">Йога</option>
                <option value="Другое">Другое</option>
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
            <button className="workout-form__button" type="submit">Добавить тренировку</button>
        </form>
    );
}