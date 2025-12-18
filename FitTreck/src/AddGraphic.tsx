import dayjs from "dayjs";
import { type WeightEntry, type WeightPoint } from "./types";

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

    return (
        <pre>{JSON.stringify(points, null, 2)}</pre>
    );
}