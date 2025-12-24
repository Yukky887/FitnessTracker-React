import type { WeightPoint } from "./types";

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        payload: WeightPoint;
        value: number;
        dataKey: string;
    }>;
    label?: string;
}

export const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div className="tooltip-weight">
                <span className="tooltip-label">Вес: </span>
                <span className="tooltip-value">{data.weight} кг</span>
            </div>
        );
    }

    return null;
};