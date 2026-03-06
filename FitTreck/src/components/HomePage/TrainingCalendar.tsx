import dayjs from 'dayjs';
import './TrainingCalendar.css';
import { useNavigate } from "react-router-dom";
import type { WorkoutType } from '../../types';

type ISODate = string;

interface CalendarCell {
    date: ISODate;
}

interface WorkoutInfo {
    date: ISODate;
    type: WorkoutType;
}

interface TrainingCalendarProps {
    workoutDates: Array<{ date: ISODate, type: WorkoutType }>;
}

const typeColors: Record<WorkoutType, string> = {
    "Силовая": "#c94a4a",
    "Кардио": "#c9b24a",
    "Другое": "#4ac9b2"
};


export function TrainingCalendar({ workoutDates }: TrainingCalendarProps) {
    const weeks = 26;
    const days = 7;
    const rawDay = dayjs().day();
    const dayInWeek = rawDay === 0 ? 7 : rawDay;
    const totalCells = (weeks * days) - (7 - dayInWeek);

    const navigate = useNavigate();

    const today = dayjs();
    const startDate = today.subtract(totalCells - 1, "day");

    const cells: CalendarCell[] = Array.from(
        { length: totalCells }, (_, index) => {
            const date = startDate.add(index, "day").format("YYYY-MM-DD");
            return { date };
        }
    )

    const getWorkoutsForDate = (date: ISODate): WorkoutInfo[] => {
        return workoutDates.filter(w => w.date === date);
    }

    const getWorkoutColors = (workouts: WorkoutInfo[]): string[] => {
        return workouts.map(w => typeColors[w.type] || "#808080");
    }

        const getSingleClass = (workout: WorkoutInfo): string => {
        switch(workout.type) {
            case "Силовая":
                return "square-strength";
            case "Кардио":
                return "square-cardio";
            case "Другое":
                return "square-other";
            default:
                return "square-active";
        }
    }

    const getMultipleStyle = (workouts: WorkoutInfo[]): React.CSSProperties => {
        const colors = getWorkoutColors(workouts);
        
        const style: React.CSSProperties = {};
        colors.forEach((color, index) => {
            style[`--color${index + 1}` as any] = color;
        });
        
        style['--count' as any] = workouts.length;
        
        return style;
    };

    return (
        <div className="training-calendar-container">
            <div className="day-of-week">
                <p>Пн</p>
                <p>Вт</p>
                <p>Ср</p>
                <p>Чт</p>
                <p>Пт</p>
                <p>Сб</p>
                <p>Вс</p>
            </div>
            <div className="training-calendar">
                {cells.map((cell) => {
                    const workouts = getWorkoutsForDate(cell.date);
                    const title = workouts.length > 0 
                        ? `${cell.date}: ${workouts.map(w => w.type).join(', ')}`
                        : cell.date;

                        let className = "square";
                        let style: React.CSSProperties = {};
                        
                        if (workouts.length === 1) {
                            className = getSingleClass(workouts[0]);
                        } else if (workouts.length > 1) {
                            className = "square-multiple";
                            style = getMultipleStyle(workouts);
                        }
                    
                    return (
                        <div 
                            key={cell.date} 
                            className={className}
                            style={style}
                            date-count={workouts.length > 1 ? workouts.length : undefined}
                            title={title}
                            onClick={() => navigate(`/training/${cell.date}`)}
                        />
                    );
                })}
            </div>
        </div>
    );
}