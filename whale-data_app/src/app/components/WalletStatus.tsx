'use client'

import { useAuth } from '../../hooks/useAuth'
import { Wallet, AlertCircle, CheckCircle } from 'lucide-react'

export function WalletStatus() {
  const { isConnected, address, formatAddress, balance, isConnecting } = useAuth()

  if (isConnecting) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
          <span className="text-yellow-500 text-sm">Connecting wallet...</span>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <div>
            <h3 className="text-red-500 font-medium">Wallet Not Connected</h3>
            <p className="text-red-400 text-sm">Connect your wallet to access all features</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <h3 className="text-green-500 font-medium">Wallet Connected</h3>
            <p className="text-green-400 text-sm">{formatAddress(address!)}</p>
          </div>
        </div>
        
        {balance && (
          <div className="text-right">
            <div className="text-white font-medium">
              {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </div>
            <div className="text-gray-400 text-sm">Balance</div>
          </div>
        )}
      </div>
    </div>
  )
} 