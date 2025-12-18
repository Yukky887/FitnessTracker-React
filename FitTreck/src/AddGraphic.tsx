import dayjs from "dayjs";
import { type WeightEntry, type WeightPoint } from "./types";
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer } from "recharts";

interface AddGraphicProps {
    entries: WeightEntry[];
}

export function AddGraphic({ entries }: AddGraphicProps) {
    const now = dayjs();
    const thirtyDaysAgo = now.subtract(30, "day");

    const recentEntries = entries
        .filter(entry => dayjs(entry.date).isAfter(thirtyDaysAgo, "day") || dayjs(entry.date).isSame(thirtyDaysAgo, "day"))
        .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

    console.log(recentEntries)

    const points: WeightPoint[] = recentEntries.map(entry => ({
        date: entry.date,
        weight: entry.weight,
    }));

    if (points.length === 0) {
        return <p>Недостаточно данных для графика</p>;
    }
    

    return (
        <div style={{ width: 600, height: 200 }}>
                <LineChart width={600} height={200} data={points}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#8884d8"
                        dot={false}
                    />
                </LineChart>
        </div>
    );
}