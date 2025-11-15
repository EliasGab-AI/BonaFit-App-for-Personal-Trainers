import React, { useState, useEffect } from 'react';
import type { StudentProfile, TrainerSummary, DayOfWeek } from '../types';
import { geminiService } from '../services/geminiService';
import StudentCard from './StudentCard';
import { TrophyIcon, ArrowLeftIcon } from './icons';
import MonthlyAttendanceReport from './MonthlyAttendanceReport';
import ScheduleManager from './ScheduleManager';

interface TrainerViewProps {
  students: StudentProfile[];
  onUpdateSchedule: (studentId: string, newSchedule: Partial<Record<DayOfWeek, string>>) => void;
}

const GeminiInsights: React.FC<{ summary: TrainerSummary | null; isLoading: boolean }> = ({ summary, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl animate-pulse">
                 <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
                 <div className="space-y-3">
                    <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
                    <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
                    <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
                </div>
            </div>
        );
    }
    
    if (!summary) {
        return <div className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 p-6 rounded-xl">Falha ao obter resumo da turma.</div>;
    }

    return (
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">💡 Resumo da Turma (IA)</h3>
            <p className="text-slate-700 dark:text-slate-300">{summary.overallSummary}</p>
            {summary.alerts.length > 0 && (
                 <div>
                    <h4 className="font-semibold text-amber-600 dark:text-amber-400">⚠️ Alertas</h4>
                    <ul className="list-disc list-inside text-slate-700 dark:text-slate-300">
                        {summary.alerts.map((alert, index) => <li key={index}><strong>{alert.studentName}:</strong> {alert.alert}</li>)}
                    </ul>
                </div>
            )}
             <div>
                <h4 className="font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2"><TrophyIcon className="w-5 h-5" /> Desafio da Semana</h4>
                <p className="text-slate-700 dark:text-slate-300">{summary.challengeSuggestion}</p>
            </div>
        </div>
    );
};

const TrainerView: React.FC<TrainerViewProps> = ({ students, onUpdateSchedule }) => {
  const [summary, setSummary] = useState<TrainerSummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(true);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoadingSummary(true);
      const result = await geminiService.getTrainerSummaryForStudents(students);
      setSummary(result);
      setIsLoadingSummary(false);
    };
    
    if (!selectedStudent) {
        fetchSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students, selectedStudent]);

  const handleSaveSchedule = (newSchedule: Partial<Record<DayOfWeek, string>>) => {
    if (selectedStudent) {
      onUpdateSchedule(selectedStudent.id, newSchedule);
      setSelectedStudent(prev => prev ? { ...prev, schedule: newSchedule } : null);
    }
  };

  if (selectedStudent) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedStudent(null)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Voltar para o Painel
        </button>
        <div className="flex items-center gap-4">
          <img src={selectedStudent.avatarUrl} alt={selectedStudent.name} className="w-20 h-20 rounded-full object-cover" />
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Gerenciar {selectedStudent.name.split(' ')[0]}</h2>
            <p className="text-slate-500 dark:text-slate-400">Atualize a agenda de treinos semanais.</p>
          </div>
        </div>
        <ScheduleManager 
          initialSchedule={selectedStudent.schedule || {}}
          onSave={handleSaveSchedule}
          isReadOnly={false}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
       <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Painel da Treinadora</h2>
          <p className="text-slate-500 dark:text-slate-400">Acompanhe o progresso de suas alunas.</p>
        </div>

        <GeminiInsights summary={summary} isLoading={isLoadingSummary} />

        <MonthlyAttendanceReport students={students} />

        <div className="space-y-4">
             <h3 className="text-xl font-bold text-slate-800 dark:text-white">Gerenciar Alunas</h3>
            {students.map(student => (
                <StudentCard 
                  key={student.id} 
                  student={student} 
                  onClick={() => setSelectedStudent(student)}
                />
            ))}
        </div>
    </div>
  );
};

export default TrainerView;