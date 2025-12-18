export type ISODate = string;

export interface WeightEntry {
    id: string;
    date: ISODate;
    weight: number;
    notes?: string;
}

export interface WeightPoint {
    date:ISODate;
    weight: number;
}