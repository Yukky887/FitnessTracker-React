import dayjs from 'dayjs';
import { WeightChart } from './WeightChart';
import type { WeightEntry } from './types';
import { useWeightStats, type Period } from './useWeightStats';
import { PeriodSelector } from './PeriodSelector';
import { useState } from 'react';

export function WeightStatsPage({ entries }: { entries: WeightEntry[] }) {
    const [period, setPeriod] = useState<Period>("month");
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
            <PeriodSelector
                value={period}
                onChange={setPeriod}
            />
            <p>
                Дельта: {delta?.toFixed(1) ?? "—"} кг  
                <br />
                Среднее за неделю: {avgPerWeek?.toFixed(2) ?? "—"} кг
            </p>
        </div>
    );
}   