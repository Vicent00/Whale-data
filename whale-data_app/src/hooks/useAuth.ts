import { useAccount, useDisconnect, useBalance } from 'wagmi'
import { useConnect } from 'wagmi'
import { useState, useEffect } from 'react'

export function useAuth() {
  const { address, isConnected, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect, connectors, error: connectError } = useConnect()
  const [isLoading, setIsLoading] = useState(false)

  // Get balance for connected wallet
  const { data: balance, isLoading: balanceLoading } = useBalance({
    address,
  })

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Get chain info
  const getChainInfo = () => {
    if (!address) return null
    
    // This would be enhanced with actual chain detection
    return {
      name: 'Ethereum',
      id: 1,
      icon: '🔷'
    }
  }

  // Handle wallet connection
  const handleConnect = async (connectorId: string) => {
    setIsLoading(true)
    try {
      const connector = connectors.find(c => c.id === connectorId)
      if (connector) {
        await connect({ connector })
      }
    } catch (error) {
      console.error('Connection error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle wallet disconnection
  const handleDisconnect = () => {
    disconnect()
  }

  return {
    // State
    address,
    isConnected,
    isConnecting,
    isLoading,
    balance,
    balanceLoading,
    
    // Actions
    connect: handleConnect,
    disconnect: handleDisconnect,
    
    // Utilities
    formatAddress,
    getChainInfo,
    connectors,
    connectError,
  }
} 