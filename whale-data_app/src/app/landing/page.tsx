'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ArrowRight, TrendingUp, Users, Activity, Bell, Shield } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../hooks/useAuth'

export default function LandingPage() {
  const router = useRouter()
  const { isConnected, isConnecting } = useAuth()

  // Redirect to dashboard if already connected
  useEffect(() => {
    if (isConnected && !isConnecting) {
      console.log(' Landing - User already connected, redirecting to dashboard')
      router.push('/dashboard')
    }
  }, [isConnected, isConnecting, router])

  // Show loading while connecting
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

  // Show loading if already connected
  if (isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold text-white">Whale Data</span>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Track Whale Movements
            <span className="text-blue-500 block">in Real-Time</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Follow the smart money. Get instant alerts when whales make significant moves across Ethereum, Polygon, and BSC.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <TrendingUp className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Real-Time Tracking</h3>
            <p className="text-gray-400">Monitor whale transactions as they happen across multiple chains</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <Bell className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Smart Alerts</h3>
            <p className="text-gray-400">Get notified instantly when whales make significant moves</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <Users className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Whale Directory</h3>
            <p className="text-gray-400">Discover and follow the most active whale addresses</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <Activity className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
            <p className="text-gray-400">Advanced analytics and pattern recognition</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
          <Shield className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Tracking?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Connect your wallet to access the full Whale Data platform. No registration required - just connect and start tracking.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors space-x-2"
          >
            <span>Start Tracking Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Whale Data. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}