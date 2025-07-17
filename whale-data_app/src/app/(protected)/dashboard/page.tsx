'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../hooks/useAuth'
import { Dashboard } from '../../components/Dashboard'

export default function DashboardPage() {
  const router = useRouter()
  const { isConnected, isConnecting } = useAuth()

  // Redirect to landing if not connected
  useEffect(() => {
    if (!isConnecting && !isConnected) {
      console.log(' Dashboard - User not connected, redirecting to landing')
      router.push('/landing')
    }
  }, [isConnected, isConnecting, router])

  // Show loading while checking connection
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

  // Show loading if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // Show dashboard if connected
  return <Dashboard />
}