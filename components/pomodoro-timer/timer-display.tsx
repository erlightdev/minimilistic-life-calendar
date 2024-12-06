'use client';

import { cn } from '@/lib/utils';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  isRunning: boolean;
}

export function TimerDisplay({ minutes, seconds, isRunning }: TimerDisplayProps) {
  return (
    <div
      className={cn(
        'text-4xl font-bold text-center  rounded-full',
        'flex items-center justify-center bg-card',
        isRunning && 'text-primary'
      )}
    >
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}