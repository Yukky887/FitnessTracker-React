import { AddWorkoutForm } from "./AddWorkoutForm" 
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { WorkoutEntry } from "../types";

const STORAGE_KEY = 'workoutEntries';

export function TrainingPage() {
    const [workouts, setWorkouts] = useLocalStorage<WorkoutEntry[]>(STORAGE_KEY, []);

    const handleAddWorkout = (workout: Omit<WorkoutEntry, "id">) => {
        setWorkouts(prev => [
            ...prev,
            { ...workout, id: crypto.randomUUID() }
        ]);
    };

    return (
        <div>
            <h1>Training Page</h1>
            <AddWorkoutForm onAddWorkout={handleAddWorkout}/>
        </div>
    );
}