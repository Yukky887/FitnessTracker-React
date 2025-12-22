import type { Period } from "./useWeightStats";

export function PeriodSelector({
    value,
    onChange,
}: {
    value: Period;
    onChange: (p: Period) => void;
}) {
    return(
        <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onChange("week")} disabled={value === "week"}>
                Неделя
            </button>
            <button onClick={() => onChange("month")} disabled={value === "month"}>
                Месяц
            </button>
            <button onClick={() => onChange("half-year")} disabled={value === "half-year"}>
                Полгода
            </button>
        </div>
    );
}