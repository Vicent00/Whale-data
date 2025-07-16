'use client'

import { useState } from 'react'
import { Settings, Bell, Shield, Palette, Wallet, User, Globe, Moon, Sun, Monitor, Activity } from 'lucide-react'

const notificationTypes = [
  { id: 'whale_activity', label: 'Whale Activity', description: 'Get notified when followed whales make transactions' },
  { id: 'price_alerts', label: 'Price Alerts', description: 'Receive alerts for significant price movements' },
  { id: 'volume_spikes', label: 'Volume Spikes', description: 'Notifications for unusual trading volume' },
  { id: 'new_whales', label: 'New Whales', description: 'When new whales are added to the platform' },
  { id: 'weekly_summary', label: 'Weekly Summary', description: 'Weekly digest of whale activities' },
]

const chainOptions = [
  { id: 'ethereum', label: 'Ethereum', icon: '🔷' },
  { id: 'polygon', label: 'Polygon', icon: '🟣' },
  { id: 'arbitrum', label: 'Arbitrum', icon: '🔵' },
  { id: 'optimism', label: 'Optimism', icon: '🔴' },
  { id: 'bsc', label: 'BNB Smart Chain', icon: '🟡' },
]

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    whale_activity: true,
    price_alerts: true,
    volume_spikes: false,
    new_whales: true,
    weekly_summary: false,
  })

  const [selectedChains, setSelectedChains] = useState(['ethereum', 'polygon'])
  const [theme, setTheme] = useState('dark')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(30)

  const handleNotificationToggle = (id: string) => {
    setNotifications(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev]
    }))
  }

  const handleChainToggle = (chainId: string) => {
    setSelectedChains(prev => 
      prev.includes(chainId) 
        ? prev.filter(id => id !== chainId)
        : [...prev, chainId]
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-white">Profile Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                <input
                  type="text"
                  placeholder="Enter your display name"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
            </div>
            
            <div className="space-y-4">
              {notificationTypes.map((notification) => (
                <div key={notification.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{notification.label}</h4>
                    <p className="text-sm text-gray-400">{notification.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[notification.id as keyof typeof notifications]}
                      onChange={() => handleNotificationToggle(notification.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Chain Preferences */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-white">Chain Preferences</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chainOptions.map((chain) => (
                <div key={chain.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{chain.icon}</span>
                    <span className="text-white font-medium">{chain.label}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedChains.includes(chain.id)}
                      onChange={() => handleChainToggle(chain.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-white">Theme</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'system', label: 'System', icon: Monitor },
              ].map((themeOption) => (
                <label key={themeOption.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value={themeOption.id}
                    checked={theme === themeOption.id}
                    onChange={(e) => setTheme(e.target.value)}
                    className="sr-only peer"
                  />
                  <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                    theme === themeOption.id 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-600'
                  }`}>
                    {theme === themeOption.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <themeOption.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-white">{themeOption.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Auto Refresh Settings */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-white">Auto Refresh</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Enable auto refresh</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              {autoRefresh && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Refresh Interval (seconds)</label>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(Number(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>10s</span>
                    <span>{refreshInterval}s</span>
                    <span>120s</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Wallet Settings */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Wallet className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-white">Wallet Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Show wallet balance</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white">Auto-connect wallet</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-white">Security</h3>
            </div>
            
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Change Password
              </button>
              <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                Export Data
              </button>
              <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  )
} 