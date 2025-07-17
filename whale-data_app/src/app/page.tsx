'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const router = useRouter()
  const { isConnected, isConnecting } = useAuth()

  useEffect(() => {
    if (!isConnecting) {
      if (isConnected) {
        console.log(' Home - User connected, redirecting to dashboard')
        router.push('/dashboard')
      } else {
        console.log(' Home - User not connected, redirecting to landing')
        router.push('/landing')
      }
    }
  }, [isConnected, isConnecting, router])

  // Show loading while determining redirect
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  )
}
