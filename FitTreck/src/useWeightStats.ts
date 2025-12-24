import dayjs from "dayjs";
import type { WeightEntry, WeightPoint } from "./types";

export type Period = "week" | "month" | "half-year";

export function useWeightStats(
    entries: WeightEntry[],
    period: Period
) {
    const PERIOD_DAYS: Record<Period, number> = {
        week: 7,
        month: 30,
        "half-year": 180,
    };

    const days = PERIOD_DAYS[period];

    const formDate = dayjs().subtract(days, "day")

    const recentEntries = entries
        .filter(entry => dayjs(entry.date).isAfter(formDate, "day") || dayjs(entry.date).isSame(formDate, "day"))
        .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

    const points: WeightPoint[] = recentEntries.map(entry => ({
        date: entry.date,
        label: dayjs(entry.date).format("DD.MM"),
        weight: entry.weight,
    }));

    const daysBetween = dayjs(recentEntries[recentEntries.length - 1].date)
        .diff(dayjs(recentEntries[0].date), "day");

    if (daysBetween < 1) {
        return null;
    }

    const delta =
        recentEntries.length >= 2
            ? recentEntries[recentEntries.length - 1].weight -
            recentEntries[0].weight
            : null;

    const avgPerWeek =
        delta !== null && recentEntries.length >= 2
            ? delta /
            (daysBetween / 7)
            : null;
    return {
        points,
        delta,
        avgPerWeek,
    };
}