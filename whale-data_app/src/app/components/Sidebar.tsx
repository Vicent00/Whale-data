'use client'

import { BarChart3, TrendingUp, Users, Activity, Bell, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Whales', href: '/whales', icon: Users },
  { name: 'Transactions', href: '/transactions', icon: Activity },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Navigation
            </h3>
            <nav className="mt-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Quick Stats
            </h3>
            <div className="mt-4 space-y-3">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-sm text-gray-400">Active Whales</div>
                <div className="text-2xl font-bold text-white">1,234</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-sm text-gray-400">24h Volume</div>
                <div className="text-2xl font-bold text-white">$45.2M</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-sm text-gray-400">Total Trades</div>
                <div className="text-2xl font-bold text-white">8,567</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 