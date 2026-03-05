import dayjs from 'dayjs';
import './TrainingCalendar.css';
import { useNavigate } from "react-router-dom";
import type { WorkoutType } from '../../types';

type ISODate = string;

interface CalendarCell {
    date: ISODate;
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

    console.log(workoutDates);


    const getWorkoutsForDate = (date: ISODate) => {
        return workoutDates.filter(w => w.date === date);
    }

    const getSquareClass = (date: ISODate) => {
        const workouts = getWorkoutsForDate(date);

        if (workouts.length === 0) return "square";

        if (workouts.length > 1) return "square-multiple";

        switch(workouts[0].type) {
            case "Силовая":
                return "square-strength";
            case "Кардио":
                return "square-cardio";
            case "Другое":
                return "square-somthing";
            default:
                return "square-active";
        }
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
                    const squareClass = getSquareClass(cell.date);
                    const title = workouts.length > 0 
                        ? `${cell.date}: ${workouts.map(w => w.type).join(', ')}`
                        : cell.date;
                    
                    return (
                        <div 
                            key={cell.date} 
                            className={squareClass}
                            title={title}
                            onClick={() => workouts.length > 0 && navigate(`/training/${cell.date}`)}
                        />
                    );
                })}
            </div>
        </div>
    );
}