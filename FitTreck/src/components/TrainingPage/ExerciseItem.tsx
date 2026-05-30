import { useState } from "react";
import type { Exercise } from "../../types";
import "./ExerciseItem.css";

interface ExerciseItemProps {
    exercise: Exercise;
    onUpdate: (updated: Exercise) => void;
    onDelete: () => void;
}

export function ExerciseItem({ exercise, onUpdate, onDelete }: ExerciseItemProps) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className={`exercise-item ${exercise.complited ? 'complited' : ''}`}>
            <div className="exercise-header">
                <input
                    type="checkbox"
                    checked={exercise.complited}
                    onChange={(e) => onUpdate({ ...exercise, complited: e.target.checked })}
                />
                <h4>{exercise.name}</h4>
                <button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Сохранить" : "Изменить"}
                </button>
                <button onClick={onDelete}>"Удалить"</button>
            </div>

            {isEditing ? (
                <div className="exercise-edit">
                    <label>
                        Подходы:
                        <input
                            type="number"
                            value={exercise.sets || ''}
                            onChange={(e) => onUpdate({ ...exercise, sets: parseInt(e.target.value) || undefined})}
                            placeholder="Кол-во"
                        />
                    </label>

                    <label>
                        Повторения:
                        <input
                            type="number"
                            value={exercise.reps || ''}
                            onChange={(e) => onUpdate({ ...exercise, reps: parseInt(e.target.value) || undefined})}
                            placeholder="Кол-во"
                        />
                    </label>

                    <label>
                        Вес (кг):
                        <input
                            type="number"
                            value={exercise.weight || ''}
                            onChange={(e) => onUpdate({ ...exercise, weight: parseFloat(e.target.value) || undefined})}
                            placeholder="кг"
                            step="0.5"
                        />
                    </label>

                    <label>
                        Длительность (мин):
                        <input
                            type="number"
                            value={exercise.duration || ''}
                            onChange={(e) => onUpdate({ ...exercise, duration: parseInt(e.target.value) || undefined})}
                            placeholder="мин"
                        />
                    </label>

                    <textarea
                        value={exercise.notes || ''}
                        onChange={(e) => onUpdate({ ...exercise, notes: e.target.value })}
                        placeholder="Заметка"
                    />
                </div>

            ) : (
                <div className="exercise-stats">
                    {exercise.sets && <span>{exercise.sets} подходов</span>}
                    {exercise.reps && <span>{exercise.reps} повторений</span>}
                    {exercise.weight && <span>{exercise.weight} кг</span>}
                    {exercise.duration && <span>{exercise.duration} мин</span>}
                    {exercise.notes && <p className="exercise-notes">{exercise.notes}</p>}
                </div>
            )}
        </div>
    )
}