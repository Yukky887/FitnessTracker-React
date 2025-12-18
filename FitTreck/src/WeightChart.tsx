import dayjs from "dayjs";
import type { WeightEntry } from "./types";

interface WeightChartProps {
    entries: WeightEntry[];
}

export function WeightChart({ entries }: WeightChartProps) {
    const now = dayjs();
    const thirtyDaysAgo = now.subtract(30, "day");

    const recentEntries = entries
        .filter(entry => dayjs(entry.date).isAfter(thirtyDaysAgo) || dayjs(entry.date).isSame(thirtyDaysAgo, "day"))
        .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

        console.log(recentEntries)
    return (
        <pre>{JSON.stringify(recentEntries, null, 2)}</pre>
    );
}