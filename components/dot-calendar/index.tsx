// components/dot-calendar/index.tsx
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { Dot } from './dot';

dayjs.extend(isLeapYear);

export function DotCalendar() {
  const now = dayjs();
  const startOfYear = now.startOf('year');
  const daysInYear = now.isLeapYear() ? 366 : 365;

  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    const calculateFillPercentage = () => {
      const startOfDay = now.startOf('day');
      const endOfDay = now.endOf('day');
      const totalSecondsInDay = endOfDay.diff(startOfDay, 'seconds');
      const secondsPassed = now.diff(startOfDay, 'seconds');
      return (secondsPassed / totalSecondsInDay) * 100; // Percentage of the day passed
    };

    setFillPercentage(calculateFillPercentage());
  }, [now]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(32px,1fr))] gap-1">
        {Array.from({ length: daysInYear }, (_, index) => {
          const date = startOfYear.add(index, 'day');
          const today = now.format('YYYY-MM-DD');
          const dotDate = date.format('YYYY-MM-DD');

          return (
            <Dot
              key={dotDate}
              date={dotDate}
              size={32} // Pass the dot size here
              fill={dotDate === today ? fillPercentage : 100} // Fill current day based on time passed, previous days filled completely
              status={
                dotDate === today
                  ? 'current'
                  : date.isBefore(now)
                  ? 'filled'
                  : 'empty'
              }
            />
          );
        })}
      </div>
    </div>
  );
}