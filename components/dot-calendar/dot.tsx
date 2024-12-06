// components/dot-calendar/dot.tsx
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';

interface DotProps {
  date: string;
  fill: number;
  size: number;
  status: 'empty' | 'filled' | 'current';
}

export function Dot({ date, fill, size, status }: DotProps) {
  const dotDate = dayjs(date);
  
  // Memoize radius and circumference calculations
  const radius = useMemo(() => size / 2 - 2, [size]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const strokeDashoffset = useMemo(() => circumference * (1 - fill / 100), [circumference, fill]);

  return (
    <motion.div
      className={cn(
        'rounded-full relative flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden',
        status === 'empty' && 'bg-gray-200 dark:bg-gray-300',
        status === 'filled' && 'bg-white dark:bg-white',
        status === 'current' && 'bg-teal-500 text-white ring-2 ring-teal-600 ring-offset-2'
      )}
      style={{
        width: size,
        height: size,
        opacity: status === 'current' ? 1 : (1 - dotDate.month() / 12),
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {status === 'current' && (
        <svg 
          width={size} 
          height={size} 
          className="absolute top-0 left-0"
        >
          {/* Progress circle */}
          <circle 
            cx="50%" 
            cy="50%" 
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 1s linear',
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%'
            }}
          />
        </svg>
      )}
    </motion.div>
  );
}