import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth } from "date-fns";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar() {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth
    });

    const firstDayIndex = getDay(firstDayOfMonth);

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-center text-lg font-semibold text-customBlue dark:text-customGold">{format(currentDate, "MMMM yyyy")}</h2>
            <div className="grid grid-cols-7 gap-2 text-center">
                {WEEKDAYS.map(day =>
                    <div key={day} className="font-semibold">
                        {day}
                    </div>)}
                {Array.from({ length: firstDayIndex }).map((_, index) =>
                    <div key={`empty-${index}`} className="p-1" />
                )}
                {daysInMonth.map((day, index) =>
                    <div key={index} className={`border rounded p-1 ${isToday(day) && "bg-customBlue dark:bg-customGold dark:text-black text-white"}`}>
                        {format(day, "d")}
                    </div>)}
            </div>
        </div>
    );
};

export default Calendar;