'use client'

import { useAuth } from '../../hooks/useAuth'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Wallet, Lock, ArrowRight } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isConnected, isConnecting } = useAuth()

  // Show loading state while connecting
  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Connecting wallet...</p>
        </div>
      </div>
    )
  }

  // Show authentication required screen if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Authentication Required</h1>
            <p className="text-gray-400">
              Connect your wallet to access Whale Data platform
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="text-center mb-6">
              <Wallet className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-white mb-2">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400 text-sm">
                Access real-time whale tracking, analytics, and alerts
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <ConnectButton />
            </div>

            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <ArrowRight className="w-4 h-4 text-blue-400" />
                <span>Track whale movements in real-time</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowRight className="w-4 h-4 text-blue-400" />
                <span>Get instant alerts on large transactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowRight className="w-4 h-4 text-blue-400" />
                <span>Analyze trading patterns and trends</span>
              </div>
            </div>
          </div>

          {fallback && (
            <div className="mt-6">
              {fallback}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Show protected content if connected
  return <>{children}</>
} 