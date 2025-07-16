'use client'

import { useState } from 'react'
import { BarChart, LineChart, PieChart, Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Activity, Users, Target } from 'lucide-react'

// Mock data for analytics
const volumeData = [
  { date: 'Jan 1', volume: 12000000, trades: 45 },
  { date: 'Jan 2', volume: 15000000, trades: 52 },
  { date: 'Jan 3', volume: 18000000, trades: 67 },
  { date: 'Jan 4', volume: 14000000, trades: 38 },
  { date: 'Jan 5', volume: 22000000, trades: 89 },
  { date: 'Jan 6', volume: 19000000, trades: 74 },
  { date: 'Jan 7', volume: 25000000, trades: 95 },
]

const protocolData = [
  { name: 'Uniswap', value: 45, color: '#FF6B6B' },
  { name: 'SushiSwap', value: 25, color: '#4ECDC4' },
  { name: 'OpenSea', value: 20, color: '#45B7D1' },
  { name: 'Other', value: 10, color: '#96CEB4' },
]

const whalePerformanceData = [
  { name: 'Whale Alpha', volume: 12500000, trades: 156, successRate: 87.5 },
  { name: 'Whale Beta', volume: 8900000, trades: 89, successRate: 92.1 },
  { name: 'Whale Gamma', volume: 5600000, trades: 234, successRate: 78.3 },
  { name: 'Whale Delta', volume: 4200000, trades: 67, successRate: 85.2 },
  { name: 'Whale Epsilon', volume: 3800000, trades: 123, successRate: 79.8 },
]

const timeRangeOptions = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
  { value: '1y', label: '1 Year' },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeRangeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Volume and Trades Chart */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Volume & Trades Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={volumeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }}
              labelStyle={{ color: '#9CA3AF' }}
              formatter={(value: number, name: string) => [name === 'volume' ? `$${(value/1e6).toFixed(1)}M` : value, name.charAt(0).toUpperCase() + name.slice(1)]}
            />
            <Legend />
            <Bar dataKey="volume" fill="#3B82F6" name="Volume" />
            <Bar dataKey="trades" fill="#F59E42" name="Trades" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Protocol Distribution Pie Chart */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Protocol Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={protocolData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {protocolData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }}
              labelStyle={{ color: '#9CA3AF' }}
              formatter={(value: number) => [`${value}%`, 'Share']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Whale Performance Table */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Whale Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Whale</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Volume</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trades</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Success Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {whalePerformanceData.map((whale) => (
                <tr key={whale.name}>
                  <td className="px-4 py-2 text-white font-medium">{whale.name}</td>
                  <td className="px-4 py-2 text-blue-400">${whale.volume.toLocaleString()}</td>
                  <td className="px-4 py-2 text-orange-400">{whale.trades}</td>
                  <td className="px-4 py-2 text-green-400">{whale.successRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 