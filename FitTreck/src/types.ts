export type ISODate = string;

export interface WeightEntry {
    id: string;
    points: number;
    date: ISODate;
    label: ISODate;
    weight: number;
    notes?: string;
}

export interface WeightPoint {
    date:ISODate;
    weight: number;
}

export interface WorkoutEntry {
    id: string;
    date: string;
    type: WorkoutType;
    notes: string;
    completed: boolean;
}

export type WorkoutType = "Силовая" | "Кардио" | "Йога" | "Другое";