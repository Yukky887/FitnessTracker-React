export type ISODate = string;

export interface WeightEntry {
    id: string;
    points: number;
    date: ISODate;
    label: ISODate;
    weight: number;
    notes?: string;
}

export interface Exercise {
    id: string;
    name: string;
    sets?: number;
    reps?: number;
    weight?: number;
    duration?: number;
    notes?: string;
    complited: boolean;
}

export interface WeightPoint {
    date:ISODate;
    weight: number;
}

export interface WorkoutEntry {
    id: string;
    date: ISODate;
    type: WorkoutType;
    name?: string;
    exercises: Exercise[];
    notes: string;
    completed: boolean;
}

export interface WorkoutTemplate {
    id: string;
    name: string;
    type: WorkoutType;
    exercises: Omit<Exercise, "id" | "complited" | "sets" | "reps" | "weight"> [];
    createdAt: string;
    usedCount: number;
}

export type WorkoutType = "Силовая" | "Кардио" | "Другое";