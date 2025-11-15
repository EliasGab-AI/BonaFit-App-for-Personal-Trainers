import React, { useState } from 'react';
import type { DayOfWeek } from '../types';
import { CalendarIcon, BellIcon } from './icons';

interface ScheduleManagerProps {
  initialSchedule: Partial<Record<DayOfWeek, string>>;
  onSave: (newSchedule: Partial<Record<DayOfWeek, string>>) => void;
  isReadOnly?: boolean;
}

const days: { key: DayOfWeek; label: string }[] = [
  { key: 'monday', label: 'Segunda' },
  { key: 'tuesday', label: 'Terça' },
  { key: 'wednesday', label: 'Quarta' },
  { key: 'thursday', label: 'Quinta' },
  { key: 'friday', label: 'Sexta' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
];

const ScheduleManager: React.FC<ScheduleManagerProps> = ({ initialSchedule, onSave, isReadOnly = false }) => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [isEditing, setIsEditing] = useState(false);

  const handleDayToggle = (day: DayOfWeek) => {
    const newSchedule = { ...schedule };
    if (newSchedule[day]) {
      delete newSchedule[day];
    } else {
      newSchedule[day] = '09:00'; // Default time
    }
    setSchedule(newSchedule);
  };

  const handleTimeChange = (day: DayOfWeek, time: string) => {
    setSchedule({ ...schedule, [day]: time });
  };

  const handleSaveChanges = () => {
    onSave(schedule);
    setIsEditing(false);
  };

  const getNextWorkoutInfo = () => {
    const scheduledDays = days
      .filter(d => schedule[d.key])
      .map(d => `${d.label} às ${schedule[d.key]}`);

    if (scheduledDays.length === 0) {
      return 'Nenhum treino agendado. A treinadora ainda não definiu sua agenda.';
    }
    
    return `Treinos agendados para: ${scheduledDays.join(', ')}.`;
  };


  if (isReadOnly || !isEditing) {
    return (
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6" /> Agenda Semanal
          </h3>
          {!isReadOnly && (
            <button onClick={() => setIsEditing(true)} className="text-sm font-semibold text-rose-500 hover:text-rose-600">
              Editar
            </button>
          )}
        </div>
        <p className="text-slate-700 dark:text-slate-300">
          {getNextWorkoutInfo()}
        </p>
         <div className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
            <BellIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>Você receberá alertas pela manhã e 1 hora antes de cada treino agendado.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl space-y-4">
       <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <CalendarIcon className="w-6 h-6" /> Editar Agenda Semanal
      </h3>
      <div className="space-y-3">
        {days.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700/50">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id={key}
                checked={!!schedule[key]}
                onChange={() => handleDayToggle(key)}
                className="h-5 w-5 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <label htmlFor={key} className="text-slate-700 dark:text-slate-200">{label}</label>
            </div>
            {schedule[key] && (
              <input
                type="time"
                value={schedule[key]}
                onChange={(e) => handleTimeChange(key, e.target.value)}
                className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-auto p-1.5"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button onClick={() => { setIsEditing(false); setSchedule(initialSchedule); }} className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-600 rounded-full hover:bg-slate-300 dark:hover:bg-slate-500">
          Cancelar
        </button>
        <button onClick={handleSaveChanges} className="px-4 py-2 text-sm font-semibold text-white bg-rose-500 rounded-full hover:bg-rose-600">
          Salvar Agenda
        </button>
      </div>
    </div>
  );
};

export default ScheduleManager;