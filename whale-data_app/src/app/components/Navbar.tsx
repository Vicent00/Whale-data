'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Bell, Settings, User, Wallet } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'

export function Navbar() {
  const { isConnected, address, formatAddress, balance } = useAuth()

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-white">Whale Data</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/whales" className="text-gray-300 hover:text-white transition-colors">
              Whales
            </Link>
            <Link href="/transactions" className="text-gray-300 hover:text-white transition-colors">
              Transactions
            </Link>
            <Link href="/alerts" className="text-gray-300 hover:text-white transition-colors">
              Alerts
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Wallet Info */}
          {isConnected && address && (
            <div className="hidden md:flex items-center space-x-3 bg-gray-700 rounded-lg px-3 py-2">
              <Wallet className="w-4 h-4 text-blue-400" />
              <div className="text-sm">
                <div className="text-white font-medium">{formatAddress(address)}</div>
                {balance && (
                  <div className="text-gray-400 text-xs">
                    {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                  </div>
                )}
              </div>
            </div>
          )}

          <button className="p-2 text-gray-300 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-gray-300 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-gray-300 hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </button>
          
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
} 