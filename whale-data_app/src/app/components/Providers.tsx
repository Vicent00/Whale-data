'use client'

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { ApolloProvider } from '@apollo/client'
import { config } from '../../lib/wagmi'
import { client } from '../../lib/apollo'
import '@rainbow-me/rainbowkit/styles.css'
import { useState, useEffect } from 'react'

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [connectionError, setConnectionError] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Listen for connection errors
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('Connection interrupted')) {
        console.log(' Providers - Connection error detected, showing fallback')
        setConnectionError(true)
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  // Show loading screen during SSR and initial client render
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Initializing...</p>
        </div>
      </div>
    )
  }

  // Show connection error screen
  if (connectionError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-4">Connection Error</h1>
          <p className="text-gray-400 mb-6">
            There was an issue connecting to the wallet service. This is likely due to network issues or server problems.
          </p>
          <div className="space-y-4">
            <button 
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => setConnectionError(false)}
              className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Continue Anyway
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#3B82F6',
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
} 