import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import "./WeightChart.css";

export interface WeightPoint {
    date: string;
    label: string;
    weight: number;
}

interface WeightChartProps {
    data: WeightPoint[];
    showAxis?: boolean;
    onClick?: () => void;
    className?: string;
    width: number;
    height: number;
    isActiveTooltip?: boolean;
}

export function WeightChart({ data, showAxis = false, onClick, className, width, height, isActiveTooltip = false }: WeightChartProps) {
    return (
        <div className={className}
            style={{ cursor: onClick ? "pointer" : "default" }}
            onClick= {onClick}
        >
            <LineChart
                margin={{ top: 25, right: 30, left: -30, bottom: -2 }}
                width={width}
                height={height}
                data={data}
            >
                <Tooltip active={isActiveTooltip} />
                <XAxis axisLine={{ stroke: "#202020" }} dataKey="label" tick={showAxis} />
                <YAxis axisLine={{ stroke: "#202020" }} tick={showAxis} domain={['auto', 'auto']} />
                <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#676767"
                    dot={false}
                />
            </LineChart>
        </div>
    )
}