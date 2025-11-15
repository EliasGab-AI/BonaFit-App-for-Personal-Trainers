export interface HeartRateDataPoint {
  time: number; // in minutes
  bpm: number;
}

export interface WorkoutSession {
  id: string;
  date: string; // ISO 8601 date string
  duration: number; // in minutes
  distance: number; // in km
  avgHeartRate: number;
  maxHeartRate: number;
  heartRateData: HeartRateDataPoint[];
  withTrainer: boolean;
  photoUrl?: string;
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface StudentProfile {
  id: string;
  name: string;
  avatarUrl: string;
  age: number;
  workouts: WorkoutSession[];
  schedule?: Partial<Record<DayOfWeek, string>>;
}

export interface GeminiFeedback {
  heartRateAnalysis: string;
  distanceFeedback: string;
  overallMotivation: string;
  nextWorkoutSuggestion: string;
}

export interface TrainerSummary {
  overallSummary: string;
  alerts: { studentName: string; alert: string }[];
  challengeSuggestion: string;
}