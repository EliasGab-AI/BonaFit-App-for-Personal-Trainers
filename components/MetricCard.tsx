
import React from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  unit: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, unit }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md flex items-center space-x-4 transition-transform hover:scale-105">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/50 text-rose-500 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {value} <span className="text-base font-normal">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default MetricCard;
