import { AddWorkoutForm } from "./AddWorkoutForm" 
import type { WorkoutEntry } from "../types";

export function TrainingPage({setWorkouts}: {setWorkouts: React.Dispatch<React.SetStateAction<WorkoutEntry[]>>}) {
    

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