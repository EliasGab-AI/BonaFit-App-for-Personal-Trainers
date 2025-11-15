import React, { useState, useEffect } from 'react';
import type { StudentProfile, GeminiFeedback, WorkoutSession } from '../types';
import { geminiService } from '../services/geminiService';
import MetricCard from './MetricCard';
import WorkoutChart from './WorkoutChart';
import { HeartIcon, RoadIcon, ClockIcon } from './icons';
import ScheduleManager from './ScheduleManager';
import WorkoutPhotoUploader from './WorkoutPhotoUploader';

interface StudentViewProps {
  student: StudentProfile;
}

const GeminiFeedbackDisplay: React.FC<{ feedback: GeminiFeedback | null; isLoading: boolean }> = ({ feedback, isLoading }) => {
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

    if (!feedback) {
        return <div className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 p-6 rounded-xl">Falha ao obter feedback. Tente novamente mais tarde.</div>;
    }

    return (
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl text-slate-700 dark:text-slate-300 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">💡 Análise do Coach Inteligente</h3>
            <div>
                <h4 className="font-semibold text-slate-600 dark:text-slate-200">❤️ Frequência Cardíaca:</h4>
                <p>{feedback.heartRateAnalysis}</p>
            </div>
            <div>
                <h4 className="font-semibold text-slate-600 dark:text-slate-200">🏃‍♀️ Distância e Ritmo:</h4>
                <p>{feedback.distanceFeedback}</p>
            </div>
            <div>
                <h4 className="font-semibold text-slate-600 dark:text-slate-200">⭐ Motivação:</h4>
                <p className="italic">"{feedback.overallMotivation}"</p>
            </div>
             <div>
                <h4 className="font-semibold text-slate-600 dark:text-slate-200">🚀 Próximo Passo:</h4>
                <p>{feedback.nextWorkoutSuggestion}</p>
            </div>
        </div>
    );
};

const StudentView: React.FC<StudentViewProps> = ({ student }) => {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutSession>(student.workouts[0]);
  const [feedback, setFeedback] = useState<GeminiFeedback | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!selectedWorkout) return;
      setIsLoading(true);
      setFeedback(null);
      setPhotoUrl(selectedWorkout.photoUrl || null);
      const result = await geminiService.getWorkoutFeedback(selectedWorkout);
      setFeedback(result);
      setIsLoading(false);
    };

    fetchFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWorkout]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handlePhotoSelect = (file: File) => {
    // In a real app, you'd upload the file and get a URL.
    // Here, we'll use a local object URL for preview.
    setPhotoUrl(URL.createObjectURL(file));
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Olá, {student.name.split(' ')[0]}!</h2>
          <p className="text-slate-500 dark:text-slate-400">Aqui está o resumo do seu último treino.</p>
        </div>
        <select
          value={selectedWorkout.id}
          onChange={(e) => setSelectedWorkout(student.workouts.find(w => w.id === e.target.value) || student.workouts[0])}
          className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full sm:w-auto p-2.5"
        >
          {student.workouts.map(w => <option key={w.id} value={w.id}>{formatDate(w.date)}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard icon={<RoadIcon className="w-6 h-6" />} title="Distância" value={selectedWorkout.distance.toFixed(1)} unit="km" />
        <MetricCard icon={<ClockIcon className="w-6 h-6" />} title="Duração" value={String(selectedWorkout.duration)} unit="min" />
        <MetricCard icon={<HeartIcon className="w-6 h-6" />} title="BPM Médio" value={String(selectedWorkout.avgHeartRate)} unit="bpm" />
      </div>

      <ScheduleManager 
        initialSchedule={student.schedule || {}} 
        onSave={() => {}}
        isReadOnly={true}
      />

      <div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Evolução da Frequência Cardíaca</h3>
        <WorkoutChart data={selectedWorkout.heartRateData} />
      </div>
      
      <GeminiFeedbackDisplay feedback={feedback} isLoading={isLoading} />

      <WorkoutPhotoUploader
        photoUrl={photoUrl}
        onPhotoSelect={handlePhotoSelect}
      />

    </div>
  );
};

export default StudentView;