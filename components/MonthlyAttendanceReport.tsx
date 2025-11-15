import React from 'react';
import type { StudentProfile, WorkoutSession } from '../types';
import { ClipboardListIcon } from './icons';

interface MonthlyAttendanceReportProps {
  students: StudentProfile[];
}

const MonthlyAttendanceReport: React.FC<MonthlyAttendanceReportProps> = ({ students }) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthName = now.toLocaleString('pt-BR', { month: 'long' });

  const getMonthlySessions = (workouts: WorkoutSession[]): WorkoutSession[] => {
    return workouts.filter(w => {
      const workoutDate = new Date(w.date);
      return (
        w.withTrainer &&
        workoutDate.getMonth() === currentMonth &&
        workoutDate.getFullYear() === currentYear
      );
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md space-y-4">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <ClipboardListIcon className="w-6 h-6" />
        Relatório de Frequência - {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
      </h3>

      <div className="space-y-4">
        {students.map(student => {
          const monthlySessions = getMonthlySessions(student.workouts);
          const sessionCount = monthlySessions.length;

          return (
            <div key={student.id} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img src={student.avatarUrl} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{student.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {sessionCount} {sessionCount === 1 ? 'aula' : 'aulas'} com a personal este mês.
                  </p>
                </div>
                <div className="text-xl font-bold text-rose-500">
                  {sessionCount}
                </div>
              </div>
              {sessionCount > 0 && (
                <div className="mt-2 pl-16 text-xs text-slate-500 dark:text-slate-400">
                  <p>
                    Horários: {monthlySessions
                      .map(s =>
                        new Date(s.date).toLocaleString('pt-BR', {
                          day: 'numeric',
                          month: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).replace(', ', ' - ')
                      )
                      .join('; ')}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyAttendanceReport;