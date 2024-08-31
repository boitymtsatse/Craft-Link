import React, { useState, useEffect } from 'react';
import './CustomCalendar.css';

const CustomCalendar = ({ events }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const calendarDays = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="empty-day"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayEvents = events.filter(event => {
                const eventDate = new Date(event.start);
                return eventDate.getFullYear() === date.getFullYear() &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getDate() === date.getDate();
            });

            calendarDays.push(
                <div key={day} className="calendar-day">
                    <span>{day}</span>
                    {dayEvents.map((event, index) => (
                        <div key={index} className="event">{event.title}</div>
                    ))}
                </div>
            );
        }

        return calendarDays;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <div className="custom-calendar">
            <header>
                <button onClick={handlePrevMonth}>&lt;</button>
                <h2>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={handleNextMonth}>&gt;</button>
            </header>
            <div className="calendar-grid">
                {renderCalendar()}
            </div>
        </div>
    );
};

export default CustomCalendar;
