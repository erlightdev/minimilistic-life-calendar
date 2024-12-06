'use client';

import { Settings } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { Dot } from './dot';
import { Button } from '../ui/button';

dayjs.extend(isLeapYear);

export function DotCalendar() {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  const now = dayjs();
  const startOfYear = now.startOf('year');
  const daysInYear = now.isLeapYear() ? 366 : 365;
  const currentYear = now.year();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && pomodoroTime > 0) {
      timer = setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, pomodoroTime]);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setPomodoroTime(25 * 60);
    setIsRunning(false);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{currentYear}</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
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

      <div className="flex flex-col items-center space-y-4">
        <div className="text-4xl font-mono">{formatTime(pomodoroTime)}</div>
        <div className="flex space-x-4">
          <Button onClick={toggleTimer}>
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} variant="outline">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}