import { useState } from "react";
import type { WeightEntry } from "../../types";
import dayjs from "dayjs";
import "./AddEntryForm.css";

interface AddEntryFormProps {
    onAddEntry: (entry: Omit<WeightEntry, 'id'>) => void;
}

export function AddEntryForm({ onAddEntry }: AddEntryFormProps) {
    const [date, setDate] = useState<string>(() => {
        return dayjs().format("YYYY-MM-DD"); 
    });
    const [weight, setWeight] = useState<string>("");
    const [note, setNote] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericWeight = Number(weight);

        if (!numericWeight || numericWeight <= 0) {
            return;
        }
        onAddEntry({
            date,
            weight: numericWeight,
            notes: note.trim() ? note : undefined,
        });

        setWeight("");
        setNote("");
    };

    return (
        <form className="add-entry-form" onSubmit={handleSubmit}>
            <label>
                Дата: 
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </label>

            <label>
                Вес (кг): 
                <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                />
            </label>

            <label>
                Комментарий: 
                <input
                    type="text"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Опционально"
                />
            </label>

            <button type="submit">Сохранить</button>
        </form>

    );
};