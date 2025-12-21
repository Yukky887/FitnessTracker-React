import { WeightChart } from './WeightChart';
import type { WeightEntry } from './types';
import { useWeightStats } from './useWeightStats';

export function WeightStatsPage({ entries }: { entries: WeightEntry[] }) {
    const period = "half-year"
    const { points, delta, avgPerWeek } = useWeightStats(entries, period)

    return (
        <div>
            <p>Статистика веса</p>
            <WeightChart
                data={points}
                showAxis={true}
                className="weight-stats-page-container clickable"
                width={800}
                height={500}
                isActiveTooltip={true}
            />
            <p>Дельта: {delta} Среднее за неделю: {avgPerWeek} </p>
        </div>
    );
}   