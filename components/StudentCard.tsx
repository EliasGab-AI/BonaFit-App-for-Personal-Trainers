import React from 'react';
import type { StudentProfile } from '../types';

interface StudentCardProps {
  student: StudentProfile;
  onClick: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onClick }) => {
  const weeklyDistance = student.workouts.reduce((sum, w) => sum + w.distance, 0);
  const avgBpm = student.workouts.length > 0
    ? student.workouts.reduce((sum, w) => sum + w.avgHeartRate, 0) / student.workouts.length
    : 0;

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md flex items-center space-x-4 transition-all hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      <img src={student.avatarUrl} alt={student.name} className="w-16 h-16 rounded-full object-cover" />
      <div className="flex-1">
        <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{student.name}</p>
        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
          <span>
            🏃‍♀️ {weeklyDistance.toFixed(1)} km
          </span>
          <span>
            ❤️ {avgBpm.toFixed(0)} bpm
          </span>
          <span>
            🗓️ {student.workouts.length} treinos
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;