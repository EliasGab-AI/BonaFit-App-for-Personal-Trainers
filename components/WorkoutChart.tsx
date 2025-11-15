
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { HeartRateDataPoint } from '../types';

interface WorkoutChartProps {
  data: HeartRateDataPoint[];
}

const WorkoutChart: React.FC<WorkoutChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 md:h-80 bg-slate-100 dark:bg-slate-800 p-4 rounded-xl">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
          <XAxis dataKey="time" unit=" min" stroke="rgb(100 116 139)" />
          <YAxis domain={['dataMin - 10', 'dataMax + 10']} stroke="rgb(100 116 139)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30, 41, 59, 0.9)',
              borderColor: 'rgb(71 85 105)',
              color: 'white',
              borderRadius: '0.75rem',
            }}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend />
          <Line type="monotone" dataKey="bpm" name="Frequência Cardíaca" stroke="#f43f5e" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkoutChart;
