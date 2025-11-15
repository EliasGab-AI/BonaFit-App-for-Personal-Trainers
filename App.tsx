import React, { useState } from 'react';
import type { StudentProfile, DayOfWeek } from './types';
import StudentView from './components/StudentView';
import TrainerView from './components/TrainerView';
import { mockStudents } from './data/mockData';
import { HeartIcon, UserIcon, BriefcaseIcon, ArrowLeftIcon } from './components/icons';

const ProfileSelection: React.FC<{ onSelect: (profile: 'student' | 'trainer') => void }> = ({ onSelect }) => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Bem-vinda à BonaFit Personal!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Como você gostaria de acessar o app hoje?</p>
        <div className="flex flex-col sm:flex-row gap-4">
            <button
                onClick={() => onSelect('student')}
                className="flex items-center justify-center gap-3 w-64 px-6 py-4 bg-white dark:bg-slate-800 rounded-xl shadow-md transition-all hover:scale-105 hover:shadow-lg hover:bg-rose-50 dark:hover:bg-slate-700"
            >
                <UserIcon className="w-8 h-8 text-rose-500" />
                <div>
                    <span className="font-bold text-lg text-slate-800 dark:text-slate-100">Sou Aluna</span>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Ver meus treinos e feedback.</p>
                </div>
            </button>
            <button
                onClick={() => onSelect('trainer')}
                className="flex items-center justify-center gap-3 w-64 px-6 py-4 bg-white dark:bg-slate-800 rounded-xl shadow-md transition-all hover:scale-105 hover:shadow-lg hover:bg-rose-50 dark:hover:bg-slate-700"
            >
                <BriefcaseIcon className="w-8 h-8 text-rose-500" />
                 <div>
                    <span className="font-bold text-lg text-slate-800 dark:text-slate-100">Sou Treinadora</span>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Gerenciar minhas alunas.</p>
                </div>
            </button>
        </div>
    </div>
);


const App: React.FC = () => {
  const [profile, setProfile] = useState<'student' | 'trainer' | null>(null);
  const [students, setStudents] = useState<StudentProfile[]>(mockStudents);

  const studentUser = students.find(s => s.id === mockStudents[0].id) || mockStudents[0];

  const handleUpdateSchedule = (studentId: string, newSchedule: Partial<Record<DayOfWeek, string>>) => {
      setStudents(currentStudents =>
          currentStudents.map(s =>
              s.id === studentId ? { ...s, schedule: newSchedule } : s
          )
      );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <HeartIcon className="w-8 h-8 text-rose-500" />
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              BonaFit <span className="text-rose-500">Personal</span>
            </h1>
          </div>
          {profile && (
            <button
              onClick={() => setProfile(null)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Mudar Perfil
            </button>
          )}
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
         {!profile ? (
            <ProfileSelection onSelect={setProfile} />
         ) : profile === 'trainer' ? (
          <TrainerView students={students} onUpdateSchedule={handleUpdateSchedule} />
        ) : (
          <StudentView student={studentUser} />
        )}
      </main>
    </div>
  );
};

export default App;