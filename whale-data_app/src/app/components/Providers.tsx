'use client'

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { ApolloProvider } from '@apollo/client'
import { config } from '../../lib/wagmi'
import { client } from '../../lib/apollo'
import '@rainbow-me/rainbowkit/styles.css'
import { useEffect, useState } from 'react'

// Create a new QueryClient instance for each render to avoid SSR issues
const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [queryClient] = useState(() => createQueryClient())
  const [wagmiReady, setWagmiReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('🔧 Providers - Component mounted, setting mounted to true')
    setMounted(true)
    
    // Wait a bit for wagmi to be ready
    const timer = setTimeout(() => {
      console.log('🔧 Providers - Setting wagmi ready')
      setWagmiReady(true)
    }, 500) // Increased delay to allow for better initialization
    
    return () => clearTimeout(timer)
  }, [])

  // Add error handling for WebSocket connection issues
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('🔧 Providers - Global error caught:', event.error)
      if (event.error?.message?.includes('Connection interrupted')) {
        setError('Wallet connection interrupted. Please try again.')
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  console.log('🔧 Providers - Render called, mounted:', mounted, 'wagmiReady:', wagmiReady, 'error:', error)

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    console.log('🔧 Providers - Not mounted yet, showing loading screen')
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Show error if there's a connection issue
  if (error) {
    console.log('🔧 Providers - Showing error screen:', error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-red-500 mb-4">Connection Error</div>
          <div className="text-sm text-gray-400 mb-4">{error}</div>
          <button 
            onClick={() => {
              setError(null)
              window.location.reload()
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  console.log('🔧 Providers - Mounted, attempting to render providers')

  // Wrap in error boundary to catch wagmi errors
  try {
    console.log('🔧 Providers - Creating WagmiProvider with config')
    
    if (!wagmiReady) {
      console.log('🔧 Providers - Wagmi not ready yet, showing loading')
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-white">Initializing wallet connection...</div>
        </div>
      )
    }
    
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#3B82F6', // Blue color
              accentColorForeground: 'white',
              borderRadius: 'medium',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
            locale="en-US"
            showRecentTransactions={true}
          >
            <ApolloProvider client={client}>
              {children}
            </ApolloProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    )
  } catch (error) {
    console.error('❌ Providers - Error initializing providers:', error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-red-500 mb-4">Error initializing wallet connection</div>
          <div className="text-sm text-gray-400">Please refresh the page and try again</div>
          <div className="text-xs text-gray-500 mt-2">{String(error)}</div>
        </div>
      </div>
    )
  }
} 