import { useState } from 'react';

const DatePicker = ({ selectedDate, onDateChange, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateCalendar = (date) => {
    const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    return days;
  };

  const handleDateClick = (date) => {
    onDateChange(date);
    onClose();
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const calendarDays = generateCalendar(currentDate);

  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button onClick={onClose}>✕</button>
        <button onClick={prevMonth}>‹</button>
        <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        <button onClick={nextMonth}>›</button>
      </div>
      <div className="date-picker-body">
        <div className="date-picker-weekdays">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="date-picker-weekday">{day}</div>
          ))}
        </div>
        <div className="date-picker-days">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`date-picker-day${day && selectedDate instanceof Date && day.toDateString() === selectedDate.toDateString() ? ' selected' : ''}`}
              onClick={() => day && handleDateClick(day)}
            >
              {day ? day.getDate() : ''}
            </div>
          ))}
        </div>
      </div>
      <div className="date-picker-footer">
        <button className="clear-btn" onClick={() => onDateChange(null)}>Clear</button>
        <button className="save-btn" onClick={() => onClose()}>Save</button>
      </div>
    </div>
  );
};

export default DatePicker;
