'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';

interface DotProps {
  date: string;
  status: 'empty' | 'filled' | 'current';
  size: number;
}

export function Dot({ date, status, size }: DotProps) {
  const dotDate = dayjs(date);
  const opacity = dotDate.month() / 12; // Creates gradient effect based on month

  return (
    <motion.div
      className={cn(
        'w-5 h-5 rounded-full transition-colors duration-200',
        status === 'empty' && 'bg-gray-200 dark:bg-gray-800',
        status === 'filled' && 'bg-primary',
        status === 'current' && 'bg-primary ring-2 ring-primary ring-offset-2'
      )}
      style={{
        opacity: 1 - opacity, // Inverts opacity for gradient effect
        width: size, // Added size style
        height: size, // Added size style
      }}
      whileHover={{ scale: 1.2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  );
}