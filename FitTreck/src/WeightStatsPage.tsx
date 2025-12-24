import { WeightChart } from './WeightChart';
import type { WeightEntry } from './types';
import { useWeightStats, type Period } from './useWeightStats';
import { PeriodSelector } from './PeriodSelector';
import { useState } from 'react';
import './WeightStatsPage.css';

export function WeightStatsPage({ entries }: { entries: WeightEntry[] }) {
    const [period, setPeriod] = useState<Period>("month");
    const { points, delta, avgPerWeek } = useWeightStats(entries, period)

    const deltaText =
        delta === null
            ? "-"
            : delta > 0
                ? `+${delta.toFixed(2)} кг`
                : `${delta.toFixed(2)} кг`;

    return (
        <div className='weight-stats-container'>
            <p className='title-stats-weight'>Статистика веса</p>
            <div className="graph-button-container">
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
            </div>
            <p className='weight-stats'>
                Дельта: {deltaText}
                <br />
                Среднее за неделю: {avgPerWeek?.toFixed(2) ?? "—"} кг
            </p>
        </div>
    );
}   