import { AddWorkoutForm } from "./AddWorkoutForm"
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import type { WorkoutEntry } from "../../types";


export function TrainingPage({ setWorkouts, workouts }: { setWorkouts: React.Dispatch<React.SetStateAction<WorkoutEntry[]>>, workouts: WorkoutEntry[] }) {

    const { date } = useParams<{ date: string }>();

    const trainingDate = date
        ? dayjs(date).format("DD.MM.YYYY")
        : "Неизвестная дата";
        
    const workoutsForDay = date
        ? workouts.filter(w => w.date === date)
        : [];

    const handleAddWorkout = (workout: Omit<WorkoutEntry, "id">) => {

        if (date && workouts.some(w => w.date === date && w.type === workout.type)) {
            alert(`незя такую же тренирку создавать, уже есть ${workout.type}`)
            return
        }
        
        setWorkouts(prev => [
            ...prev,
            {
                ...workout,
                id: crypto.randomUUID()
            }
        ]);

    };

    return (
        <div>
            <h1>Training for {trainingDate}</h1>
            {workoutsForDay.length === 0 ? (
                <p>Тренировок за этот день нет</p>
            ) : (
                    /* добавить поля с выбором вида тренировки */
                <ul>  
                    {workoutsForDay.map(workout => (
                        <li key={workout.id}>
                            {workout.notes}
                        </li>
                    ))}
                </ul>
            )}
            <details className="entry-form-container">
                <summary>Добавить запись</summary>
                <AddWorkoutForm 
                    date={date ?? ""} 
                    onAddWorkout={handleAddWorkout}
                    existingTypes={workoutsForDay.map(w => w.type)} />
            </details>
        </div>
    );
}