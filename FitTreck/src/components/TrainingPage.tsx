import { AddWorkoutForm } from "./AddWorkoutForm" 
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import type { WorkoutEntry } from "../types";

export function TrainingPage({setWorkouts}: {setWorkouts: React.Dispatch<React.SetStateAction<WorkoutEntry[]>>}) {
    
    const { date } = useParams<{ date: string }>();

    const trainingDate = date
        ? dayjs(date).format("DD.MM.YYYY")
        : "Неизвестная дата"; 

    const handleAddWorkout = (workout: Omit<WorkoutEntry, "id">) => {
        if (!date) return;

        setWorkouts(prev => [
            ...prev,
            { 
                ...workout,
                date, 
                id: crypto.randomUUID() }
        ]);
    };

    return (
        <div>
            <h1>Training for {trainingDate}</h1>
            <AddWorkoutForm onAddWorkout={handleAddWorkout}/>
        </div>
    );
}