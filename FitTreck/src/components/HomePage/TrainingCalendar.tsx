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

    const getSingleClass = (date: ISODate): string => {
        const workout = getWorkoutsForDate(date); 

        if (workout.length === 0) {
            return "square";  
        } 
        
        if(workout.length === 1) {
            switch(workout[0].type) {
                case "Силовая":
                    return "square-strength";
                case "Кардио":
                    return "square-cardio";
                default:
                    return "square-other";
            }
        }

        const uniqueTypes = [...new Set(workout.map(w => w.type).sort())]
        const key = uniqueTypes.join('-').toLowerCase();

        console.log(key);

        const classMap: Record<string, string> = {
            'кардио-силовая': 'square-strength-cardio',
            'другое-кардио-силовая': 'square-strength-cardio-other'
        };

        return classMap[key] || "square-multiple";
    }

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

                    const uniqueTypes = [...new Set(workouts.map(w => w.type))]

                    const title = workouts.length > 0 
                        ? `${cell.date}: ${uniqueTypes.join(', ')}`
                        : cell.date;

                    return (
                        <div 
                            key={cell.date} 
                            className={getSingleClass(cell.date)}
                            title={title}
                            date-count={workouts.length > 1 ? workouts.length : undefined}
                            onClick={() => navigate(`/training/${cell.date}`)}
                        />
                    );
                })}
            </div>
        </div>
    );
}