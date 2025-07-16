'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for the volume chart
const data = [
  { date: 'Jan 1', volume: 12000000 },
  { date: 'Jan 2', volume: 15000000 },
  { date: 'Jan 3', volume: 18000000 },
  { date: 'Jan 4', volume: 14000000 },
  { date: 'Jan 5', volume: 22000000 },
  { date: 'Jan 6', volume: 19000000 },
  { date: 'Jan 7', volume: 25000000 },
  { date: 'Jan 8', volume: 28000000 },
  { date: 'Jan 9', volume: 32000000 },
  { date: 'Jan 10', volume: 29000000 },
  { date: 'Jan 11', volume: 35000000 },
  { date: 'Jan 12', volume: 38000000 },
  { date: 'Jan 13', volume: 42000000 },
  { date: 'Jan 14', volume: 45000000 },
  { date: 'Jan 15', volume: 48000000 },
]

const formatVolume = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`
  }
  return `$${value.toFixed(0)}`
}

export function VolumeChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatVolume}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB',
            }}
            formatter={(value: number) => [formatVolume(value), 'Volume']}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <Line
            type="monotone"
            dataKey="volume"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 