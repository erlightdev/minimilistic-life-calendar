'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { Dot } from './dot';

dayjs.extend(isLeapYear);

export function DotCalendar() {
  const now = dayjs();
  const startOfYear = now.startOf('year');
  const daysInYear = now.isLeapYear() ? 366 : 365;
  const currentYear = now.year();

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{currentYear}</h1>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] gap-1">
        {Array.from({ length: daysInYear }, (_, index) => {
          const date = startOfYear.add(index, 'day');
          const today = now.format('YYYY-MM-DD');
          const dotDate = date.format('YYYY-MM-DD');
          
          return (
            <Dot
              key={dotDate}
              date={dotDate}
              status={dotDate === today ? 'current' : date.isBefore(now) ? 'filled' : 'empty'}
            />
          );
        })}
      </div>
    </div>
  );
}