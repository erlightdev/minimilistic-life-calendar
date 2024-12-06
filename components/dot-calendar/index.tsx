// components/dot-calendar/index.tsx
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { Dot } from './dot';
import { motion } from 'framer-motion';

dayjs.extend(isLeapYear);

export function DotCalendar() {
  const now = dayjs();
  const startOfYear = now.startOf('year');
  const daysInYear = now.isLeapYear() ? 366 : 365;
  const currentYear = now.year();
  const dotSize = 32; // Set the desired dot size here

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
              size={dotSize} // Pass the dot size here
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