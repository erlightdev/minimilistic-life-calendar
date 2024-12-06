export interface DotStatus {
  date: string;
  status: 'completed' | 'ongoing' | 'future';
  progress: number;
}

export interface PomodoroSession {
  id: string;
  startTime: string;
  endTime: string;
  completed: boolean;
}

export interface UserSettings {
  dateOfBirth?: string;
  theme: 'light' | 'dark' | 'system';
  pomodoroLength: number;
  shortBreakLength: number;
  longBreakLength: number;
}