import dayjs from "dayjs";
import { type WeightEntry, type WeightPoint } from "./types";
import { LineChart, XAxis, YAxis, Line, Tooltip } from "recharts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddGraphic.css';

interface AddGraphicProps {
    entries: WeightEntry[];
}

export function AddGraphic({ entries }: AddGraphicProps) {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState<boolean>(false);

    const now = dayjs();
    const thirtyDaysAgo = now.subtract(30, "day");

    const recentEntries = entries
        .filter(entry => dayjs(entry.date).isAfter(thirtyDaysAgo, "day") || dayjs(entry.date).isSame(thirtyDaysAgo, "day"))
        .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

    const points: WeightPoint[] = recentEntries.map(entry => ({
        date: dayjs(entry.date).format("DD.MM"),
        weight: entry.weight,
    }));

    if (points.length === 0) {
        return <p>Недостаточно данных для графика</p>;
    }

    return (
        <div className="add-graphic-container clickable" 
            onClick={() => {
                navigate("/weight-stats");
            }}>
            <LineChart
                onMouseEnter={() => {
                    setHovered(true);
                }}
                onMouseLeave={() => {
                    setHovered(false);
                
                }}
                margin={{ top: 25, right: 30, left: -30, bottom: -2 }}
                width={400}
                height={300}
                data={points}
            >
                <Tooltip />
                <XAxis axisLine={{stroke:"#202020"}} dataKey="date" tick={hovered} />
                <YAxis axisLine={{stroke:"#202020"}} tick={hovered} domain={['auto', 'auto']} />
                <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#676767"
                    dot={false}
                />
            </LineChart>
        </div>
    );
}