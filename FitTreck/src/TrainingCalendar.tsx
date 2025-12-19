import dayjs from 'dayjs';
import './TrainingCalendar.css';

type ISODate = string;

interface CalendarCell {
    date: ISODate;
}

interface TrainingCalendarProps {
    workoutDates: ISODate[];
}

export function TrainingCalendar({ workoutDates }: TrainingCalendarProps) {
    const weeks = 26;
    const days = 7;
    const rawDay = dayjs().day();
    const dayInWeek = rawDay === 0 ? 7 : rawDay;
    const totalCells = (weeks * days) - (7 - dayInWeek);

    const today = dayjs();
    const startDate = today.subtract(totalCells - 1, "day");

    const cells: CalendarCell[] = Array.from(
        { length: totalCells }, (_, index) => {
            const date = startDate.add(index, "day").format("YYYY-MM-DD");
            return { date };
        }
    )

    const isWorkoutDate = (date: ISODate) => {
        return workoutDates.includes(date);
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
            <div
                className="training-calendar">
                {cells.map((cell) => (
                    <div key={cell.date} className={`square ${isWorkoutDate(cell.date) ? "square-active" : ""}`} title={cell.date} />
                ))}
            </div>
        </div>
    );
}