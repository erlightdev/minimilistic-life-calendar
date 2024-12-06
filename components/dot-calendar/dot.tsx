// components/dot-calendar/dot.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { Circle } from 'lucide-react'; // Import Circle from lucide-react

interface DotProps {
  date: string;
  fill: number; // Ensure this prop is defined
  size: number;
  status: 'empty' | 'filled' | 'current';
}

export function Dot({ date, fill, size, status }: DotProps) {
  const dotDate = dayjs(date);
  const opacity = dotDate.month() / 12; // Creates gradient effect based on month

  const fillStyle = {
    opacity: status === 'current' ? 1 : 0.5, // Adjust opacity for current day
  };

  return (
    <motion.div
      className={cn(
        'rounded-full transition-colors duration-200',
        status === 'empty' && 'bg-gray-200 dark:bg-white',
        status === 'filled' && 'bg-white',
        status === 'current' && 'bg-white ring-2 ring-white ring-offset-2'
      )}
      style={{
        width: size,
        height: size,
        opacity: 1 - opacity, // Inverts opacity for gradient effect
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {status === 'current' && (
        <Circle
          size={size}
          stroke="white"
          fill="none"
          strokeWidth={2}
          style={{
            strokeDasharray: `${fill} ${100 - fill}`, // Create a stroke dash effect based on fill percentage
            transition: 'stroke-dasharray 0.5s ease', // Smooth transition
          }}
        />
      )}
    </motion.div>
  );
}