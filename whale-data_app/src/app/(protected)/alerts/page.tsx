'use client'

import { useState } from 'react'
import { Plus, Bell, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { Alert } from '../../../types'

// Mock data for demonstration
const mockAlerts: Alert[] = [
  {
    id: '1',
    userId: 'user1',
    user: {
      id: 'user1',
      wallet: '0x1234567890abcdef1234567890abcdef12345678',
      email: 'user@example.com',
      username: 'user1',
      avatar: '',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15'),
      alerts: [],
      followedWhales: [],
    },
    type: 'volume_threshold',
    whaleId: '1',
    whale: {
      id: '1',
      address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      name: 'Whale Alpha',
      description: 'DeFi yield farmer and liquidity provider',
      tags: ['defi', 'yield-farming'],
      totalVolume: 12500000,
      totalTrades: 156,
      avgTradeSize: 80128,
      successRate: 87.5,
      followersCount: 1247,
      isActive: true,
      isVerified: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15'),
      transactions: [],
      followedBy: [],
    },
    minVolume: 100000,
    minTradeSize: 50000,
    emailEnabled: true,
    pushEnabled: true,
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
  },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleToggleAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, isActive: !alert.isActive }
        : alert
    ))
  }

  const handleDeleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case 'volume_threshold':
        return 'Volume Threshold'
      case 'whale_activity':
        return 'Whale Activity'
      case 'price_movement':
        return 'Price Movement'
      default:
        return type
    }
  }

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`
    }
    return `$${amount.toFixed(0)}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Alerts</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Alert</span>
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {getAlertTypeLabel(alert.type)}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {alert.whale?.name || 'All Whales'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleAlert(alert.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    alert.isActive 
                      ? 'bg-green-600/20 text-green-500' 
                      : 'bg-gray-600/20 text-gray-400'
                  }`}
                >
                  {alert.isActive ? (
                    <ToggleRight className="w-4 h-4" />
                  ) : (
                    <ToggleLeft className="w-4 h-4" />
                  )}
                </button>
                
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDeleteAlert(alert.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {alert.minVolume && (
                <div>
                  <span className="text-sm text-gray-400">Min Volume</span>
                  <p className="text-white font-semibold">{formatAmount(alert.minVolume)}</p>
                </div>
              )}
              
              {alert.minTradeSize && (
                <div>
                  <span className="text-sm text-gray-400">Min Trade Size</span>
                  <p className="text-white font-semibold">{formatAmount(alert.minTradeSize)}</p>
                </div>
              )}
              
              <div>
                <span className="text-sm text-gray-400">Email</span>
                <p className={`font-semibold ${alert.emailEnabled ? 'text-green-500' : 'text-gray-500'}`}>
                  {alert.emailEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              
              <div>
                <span className="text-sm text-gray-400">Push</span>
                <p className={`font-semibold ${alert.pushEnabled ? 'text-green-500' : 'text-gray-500'}`}>
                  {alert.pushEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Created: {alert.createdAt.toLocaleDateString()}</span>
              <span>Status: {alert.isActive ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No alerts configured</h3>
          <p className="text-gray-400">Create your first alert to start receiving notifications</p>
        </div>
      )}

      {/* Create Alert Form (Modal-like) */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Alert</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Alert Type</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                  <option value="volume_threshold">Volume Threshold</option>
                  <option value="whale_activity">Whale Activity</option>
                  <option value="price_movement">Price Movement</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Whale (Optional)</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                  <option value="">All Whales</option>
                  <option value="1">Whale Alpha</option>
                  <option value="2">Whale Beta</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Min Volume (USD)</label>
                <input
                  type="number"
                  placeholder="100000"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-400">Email notifications</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-400">Push notifications</span>
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Create Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 