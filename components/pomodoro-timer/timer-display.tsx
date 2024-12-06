'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  isRunning: boolean;
}

export function TimerDisplay({ minutes, seconds, isRunning }: TimerDisplayProps) {
  return (
    <motion.div
      className={cn(
        'text-6xl font-bold text-center p-8 rounded-full w-48 h-48',
        'flex items-center justify-center bg-card',
        isRunning && 'text-primary'
      )}
      animate={{
        scale: isRunning ? [1, 1.02, 1] : 1,
      }}
      transition={{
        duration: 1,
        repeat: isRunning ? Infinity : 0,
      }}
    >
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </motion.div>
  );
}