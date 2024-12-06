// components/dot-calendar/index.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { Dot } from './dot';

dayjs.extend(isLeapYear);

export function DotCalendar() {

   // Determine dot size based on screen width
   const dotSize = window.innerWidth <= 640 ? 20 : 32; // Mobile size is 20px, desktop size is 32px
  
  const [now, setNow] = useState(dayjs());
  const [fillPercentage, setFillPercentage] = useState(0);

  const startOfYear = useMemo(() => now.startOf('year'), [now]);
  const daysInYear = useMemo(() => now.isLeapYear() ? 366 : 365, [now]);

  useEffect(() => {
    const calculateFillPercentage = () => {
      const currentTime = dayjs();
      const startOfDay = currentTime.startOf('day');
      const endOfDay = currentTime.endOf('day');
      const totalSecondsInDay = endOfDay.diff(startOfDay, 'seconds');
      const secondsPassed = currentTime.diff(startOfDay, 'seconds');
      return (secondsPassed / totalSecondsInDay) * 100;
    };

    const interval = setInterval(() => {
      setNow(dayjs());
      setFillPercentage(calculateFillPercentage());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] gap-1 md:grid-cols-[repeat(auto-fill,minmax(32px,1fr))]">
        {Array.from({ length: daysInYear }, (_, index) => {
          const date = startOfYear.add(index, 'day');
          const today = now.format('YYYY-MM-DD');
          const dotDate = date.format('YYYY-MM-DD');

          return (
            <Dot
              key={dotDate}
              date={dotDate}
              size={dotSize}
              fill={dotDate === today ? fillPercentage : 100}
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