'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TimerDisplay } from './timer-display';
import { useStore } from '@/lib/store';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function PomodoroTimer() {
  const { settings, addSession } = useStore();
  const [timeLeft, setTimeLeft] = useState(settings.pomodoroLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<string | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          setIsRunning(false);
          if (sessionStartTime) {
            addSession({
              id: Math.random().toString(36).slice(2),
              startTime: sessionStartTime,
              endTime: new Date().toISOString(),
              completed: true,
            });
          }
          return settings.pomodoroLength * 60;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, settings.pomodoroLength, addSession, sessionStartTime]);

  const toggleTimer = () => {
    if (!isRunning) {
      setSessionStartTime(new Date().toISOString());
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(settings.pomodoroLength * 60);
    setSessionStartTime(null);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <motion.div
      className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center space-y-6"
      initial={{ scale:1 }}
      animate={{ scale: 1}}
      transition={{ duration: 0.3 }}
    >
      {/* <h2 className="text-2xl font-bold">Pomodoro Timer</h2> */}
      <div className="flex items-center space-x-4">
        <TimerDisplay minutes={minutes} seconds={seconds} isRunning={isRunning} />
        <div className="flex space-x-4">
          <Button onClick={toggleTimer} size="lg">
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}