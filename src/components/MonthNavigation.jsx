import React from 'react';
import './MonthNavigation.css';

const MonthNavigation = ({ selectedMonth, onMonthSelect }) => {
  const firstHalf = Array.from({ length: 6 }, (_, i) => i + 1); // 1-6월
  const secondHalf = Array.from({ length: 6 }, (_, i) => i + 7); // 7-12월

  return (
    <div className="month-navigation">
      <div className="month-row">
        {firstHalf.map(month => (
          <button
            key={month}
            className={`month-button ${month === selectedMonth ? 'active' : ''}`}
            onClick={() => onMonthSelect(month)}
          >
            {month}월
          </button>
        ))}
      </div>
      <div className="month-row">
        {secondHalf.map(month => (
          <button
            key={month}
            className={`month-button ${month === selectedMonth ? 'active' : ''}`}
            onClick={() => onMonthSelect(month)}
          >
            {month}월
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthNavigation;