import { AddGraphic } from './AddGraphic';
import type { WeightEntry } from './types';

export function WeightStatsPage({entries}: {entries: WeightEntry[]}) {
    return (
        <div>
            <AddGraphic entries={entries} />
        </div>
    );
}