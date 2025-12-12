
import React from 'react';
import { 
  BarChart, 
  Bar,      
  Line,     
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { WHO_WEIGHT_PERCENTILES } from '../data/who-percentiles'; 


export default function GrowthChart({ data }) {
  
  
  const whoAges = WHO_WEIGHT_PERCENTILES.map(d => d.ageMonths);
  const userAges = data.map(d => d.ageMonths);
  const allUniqueAges = [...new Set([...whoAges, ...userAges])].sort((a, b) => a - b);
  
  const chartBaseData = allUniqueAges.map(age => {
    const whoPoint = WHO_WEIGHT_PERCENTILES.find(d => d.ageMonths === age) || {};
    const userRecord = data.filter(r => r.ageMonths === age)
                           .sort((a, b) => new Date(b.date) - new Date(a.date))[0]; 

    return {
      ageMonths: age, 
      p97: whoPoint.p97, p85: whoPoint.p85, p50: whoPoint.p50, 
      p15: whoPoint.p15, p3: whoPoint.p3,
      userWeight: userRecord ? userRecord.weight : null, 
    };
  }).filter(d => d.ageMonths >= 0); 
  

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const userWeightPayload = payload.find(p => p.dataKey === 'userWeight');
      
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-md text-sm">
          <p className="font-bold text-secondary">{`Age: ${label} Months`}</p>
          {userWeightPayload && (
            <p className="text-primary font-bold">{`Your Baby's Weight: ${userWeightPayload.value} kg`}</p>
          )}
          <p className="text-gray-600 mt-1">
             Median (50th) Percentile: {payload.find(p => p.dataKey === 'p50')?.value} kg
          </p>
        </div>
      );
    }
    return null;
  };

  const WHO_COLOR_LIGHT = "#A7F3D0"; 
  const WHO_COLOR_MEDIUM = "#34D399"; 
  const WHO_COLOR_USER = "#4F46E5"; 

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart 
        data={chartBaseData} 
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        
        {}
        <XAxis 
          dataKey="ageMonths" 
          stroke="#4B5563" 
          type="number" 
          domain={['auto', 'auto']}
          label={{ value: 'Age (Months)', position: 'bottom', offset: 0 }}
        />
        
        {}
        <YAxis 
          label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', fill: '#4B5563' }}
          domain={['auto', 'auto']}
        />
        
        <Tooltip content={<CustomTooltip />} />
        
        {}
        <Line type="monotone" dataKey="p97" stroke={WHO_COLOR_LIGHT} dot={false} strokeWidth={1} name="97th Percentile" />
        <Line type="monotone" dataKey="p85" stroke={WHO_COLOR_LIGHT} dot={false} strokeWidth={1} name="85th Percentile" />
        <Line type="monotone" dataKey="p50" stroke={WHO_COLOR_MEDIUM} dot={false} strokeWidth={3} name="50th Percentile (Median)" />
        <Line type="monotone" dataKey="p15" stroke={WHO_COLOR_LIGHT} dot={false} strokeWidth={1} name="15th Percentile" />
        <Line type="monotone" dataKey="p3" stroke={WHO_COLOR_LIGHT} dot={false} strokeWidth={1} name="3rd Percentile" />
        
        {}
        <Bar 
          dataKey="userWeight" 
          fill={WHO_COLOR_USER}
          name="Your Baby's Measurement"
        />
        
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
      </BarChart>
    </ResponsiveContainer>
  );
}