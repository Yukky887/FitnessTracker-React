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