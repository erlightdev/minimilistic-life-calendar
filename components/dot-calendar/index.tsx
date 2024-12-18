'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { Dot } from './dot';

dayjs.extend(isLeapYear);

export function DotCalendar() {
  const [now, setNow] = useState(dayjs());
  const [fillPercentage, setFillPercentage] = useState(0);
  const [dotSize, setDotSize] = useState(32); // Default size for desktop

  const startOfYear = useMemo(() => now.startOf('year'), [now]);
  const daysInYear = useMemo(() => (now.isLeapYear() ? 366 : 365), [now]);

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

  // Optimize size detection using matchMedia
  useEffect(() => {
    const handleSizeChange = () => {
      const isMobile = window.matchMedia('(max-width: 640px)').matches;
      setDotSize(isMobile ? 20 : 32); // Set 20px for mobile, 32px for desktop
    };

    // Initial size detection
    handleSizeChange();

    // Watch for size changes
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    mediaQuery.addEventListener('change', handleSizeChange);

    return () => mediaQuery.removeEventListener('change', handleSizeChange);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(32px,1fr))] gap-1">
        {Array.from({ length: daysInYear }, (_, index) => {
          const date = startOfYear.add(index, 'day');
          const today = now.format('YYYY-MM-DD');
          const dotDate = date.format('YYYY-MM-DD');

          return (
            <Dot
              key={dotDate}
              date={dotDate}
              size={dotSize} // Pass the optimized size state
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
