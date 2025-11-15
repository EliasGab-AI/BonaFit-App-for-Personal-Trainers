import type { StudentProfile } from '../types';

const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

export const mockStudents: StudentProfile[] = [
  {
    id: 'student-1',
    name: 'Ana Clara',
    avatarUrl: 'https://picsum.photos/seed/ana/200',
    age: 28,
    schedule: {
      monday: '08:00',
      wednesday: '08:00',
      friday: '08:00',
    },
    workouts: [
      {
        id: 'w1',
        date: new Date(currentYear, currentMonth, 15, 8, 0).toISOString(),
        duration: 45,
        distance: 5.2,
        avgHeartRate: 145,
        maxHeartRate: 168,
        heartRateData: Array.from({ length: 45 }, (_, i) => ({
          time: i + 1,
          bpm: 120 + Math.sin(i / 5) * 20 + Math.random() * 10,
        })),
        withTrainer: true,
        photoUrl: 'https://picsum.photos/seed/workout1/800/600',
      },
      {
        id: 'w2',
        date: new Date(currentYear, currentMonth, 12, 8, 0).toISOString(),
        duration: 60,
        distance: 7.1,
        avgHeartRate: 150,
        maxHeartRate: 175,
        heartRateData: Array.from({ length: 60 }, (_, i) => ({
          time: i + 1,
          bpm: 130 + Math.sin(i / 6) * 25 + Math.random() * 5,
        })),
        withTrainer: true,
      },
      {
        id: 'w-solo-1',
        date: new Date(currentYear, currentMonth, 10, 18, 30).toISOString(),
        duration: 30,
        distance: 4.0,
        avgHeartRate: 140,
        maxHeartRate: 160,
        heartRateData: [],
        withTrainer: false,
      },
       {
        id: 'w-last-month',
        date: new Date(currentYear, currentMonth -1, 28, 8, 0).toISOString(),
        duration: 50,
        distance: 6.5,
        avgHeartRate: 148,
        maxHeartRate: 172,
        heartRateData: [],
        withTrainer: true,
      },
    ],
  },
  {
    id: 'student-2',
    name: 'Beatriz Lima',
    avatarUrl: 'https://picsum.photos/seed/bia/200',
    age: 32,
    workouts: [
      {
        id: 'w3',
        date: new Date(currentYear, currentMonth, 14, 9, 0).toISOString(),
        duration: 30,
        distance: 3.5,
        avgHeartRate: 138,
        maxHeartRate: 155,
        heartRateData: Array.from({ length: 30 }, (_, i) => ({
          time: i + 1,
          bpm: 125 + Math.sin(i / 4) * 15 + Math.random() * 8,
        })),
        withTrainer: true,
      },
      {
        id: 'w3-2',
        date: new Date(currentYear, currentMonth, 7, 9, 0).toISOString(),
        duration: 35,
        distance: 4.0,
        avgHeartRate: 140,
        maxHeartRate: 158,
        heartRateData: [],
        withTrainer: true,
      },
    ],
  },
  {
    id: 'student-3',
    name: 'Carla Souza',
    avatarUrl: 'https://picsum.photos/seed/carla/200',
    age: 25,
    workouts: [
        {
        id: 'w4',
        date: new Date(currentYear, currentMonth, 9, 10, 0).toISOString(),
        duration: 50,
        distance: 6.0,
        avgHeartRate: 148,
        maxHeartRate: 170,
        heartRateData: Array.from({ length: 50 }, (_, i) => ({
          time: i + 1,
          bpm: 135 + Math.sin(i / 5) * 20 + Math.random() * 10,
        })),
        withTrainer: true,
      },
    ],
  },
];