'use client';

import { motion } from 'framer-motion';
import { DotCalendar } from '@/components/dot-calendar';
import { PomodoroTimer } from '@/components/pomodoro-timer';
import { Settings } from '@/components/settings';
import dayjs from 'dayjs';

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex justify-end items-center">

          {/* <h1 className="text-4xl font-bold text-foreground">Calendar</h1> */}
          <Settings />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div className="lg:col-span-2">
            <DotCalendar />
          </div>
          <div>
            <PomodoroTimer />
          </div>
        </div>
      </motion.div>
    </main>
  );
}