import { useState } from "react";
import dayjs from "dayjs";
import type { WorkoutEntry, WorkoutType } from "../types";

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
        <form onSubmit={handleSubmit}>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <select value={type} onChange={e => setType(e.target.value as WorkoutType)}>
                <option value="Силовая">Силовая</option>
                <option value="Кардио">Кардио</option>
                <option value="Йога">Йога</option>
                <option value="Другое">Другое</option>
            </select>
            <textarea placeholder="Заметка" value={note} onChange={e => setNote(e.target.value)} />
            <label>
                <input 
                    type="checkbox"
                    checked={completed}
                    onChange={e => setCompleted(e.target.checked)}
                />
                Выполнена
            </label>
            <button type="submit">Добавить тренировку</button>
        </form>
    );
}