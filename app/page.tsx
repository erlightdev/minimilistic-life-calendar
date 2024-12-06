'use client';

import { motion } from 'framer-motion';
import { DotCalendar } from '@/components/dot-calendar';
import { PomodoroTimer } from '@/components/pomodoro-timer';
import { Settings } from '@/components/settings';
import dayjs from 'dayjs';
import DigitalClock from '@/components/digital-clock/DigitalClock';

export default function Home() {
  const currentYear = dayjs().year(); // Get current year from dayjs

  return (
    <main className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto space-y-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 items-center">
          <div className="flex justify-start">
            <h1
              className="text-2xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"
            >
              {currentYear} {/* Use the current year here */}
            </h1>
          </div>
          <div className="flex justify-end">
            <DigitalClock />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          <div className="lg:col-span-2">
            <DotCalendar />
          </div>
          <div className='justify-between flex items-center'>
            <Settings />
            <PomodoroTimer />
          </div>
        </div>
      </motion.div>
    </main>
  );
}