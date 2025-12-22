import dayjs from "dayjs";
import type { WeightEntry, WeightPoint } from "./types";

export type Period = "week" | "month" | "half-year";

export function useWeightStats(
    entries: WeightEntry[],
    period: Period
) {
    function periodOfDays(period: Period): number {
        switch (period) {
            case "week":
                return 7;
            case "month":
                return 30;
            case "half-year":
                return 180;
        }
    }

    // НУЖНО ПОФИКСИТЬ РАСЧЕТ СРЕДНЕГО ЗА НЕДЕЛЮ И ОТОБРАЖЕНИЕ ГРАФИКА ДОЛЖНО ЗАВИСИТЬ ОТ ВЫБРАННОГО ПЕРИОДА

    const days = periodOfDays(period);
    const formDate = dayjs().subtract(days, "day")

    const recentEntries = entries
        .filter(entry => dayjs(entry.date).isAfter(formDate, "day") || dayjs(entry.date).isSame(formDate, "day"))
        .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

    const points: WeightPoint[] = recentEntries.map(entry => ({
        date: entry.date,
        label: dayjs(entry.date).format("DD.MM"),
        weight: entry.weight,
    }));

    const delta =
        recentEntries.length >= 2
            ? recentEntries[recentEntries.length - 1].weight -
            recentEntries[0].weight
            : null;

    const avgPerWeek =
        delta !== null && recentEntries.length >= 2
            ? delta /
            (dayjs(recentEntries[recentEntries.length - 1].date)
                .diff(dayjs(recentEntries[0].date), "day") / 7)
            : null;
    return {
        points,
        delta,
        avgPerWeek,
    };
}