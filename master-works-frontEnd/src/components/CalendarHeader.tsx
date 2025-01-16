import React, { useCallback, memo } from "react";

interface CalendarHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const handlePreviousDay = useCallback(() => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    onDateChange(newDate);
  }, [selectedDate, onDateChange]);

  const handleNextDay = useCallback(() => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    onDateChange(newDate);
  }, [selectedDate, onDateChange]);

  const getDayName = useCallback((date: Date) => {
    return date.toLocaleDateString(undefined, { weekday: "long" });
  }, []);

  const getFullDate = useCallback((date: Date) => {
    return date.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  return (
    <div className="p-8 m-4 flex flex-col items-center ">
      <div className="flex items-center space-x-12">
        <button
          onClick={handlePreviousDay}
          className="text-gray-400 hover:text-white text-3xl p-2"
        >
          &lt;
        </button>
        <div>
          <h1 className="text-2xl font-bold">{getDayName(selectedDate)}</h1>
          <p className="text-gray-400 mt-2">{getFullDate(selectedDate)}</p>
        </div>

        <button
          onClick={handleNextDay}
          className="text-gray-400 hover:text-white text-3xl p-2"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default memo(CalendarHeader);
