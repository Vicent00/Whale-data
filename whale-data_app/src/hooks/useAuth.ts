'use client'

import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi'

export function useAuth() {
  const { address, isConnected, isConnecting } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const { data: balance } = useBalance({
    address,
  })

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return {
    address,
    isConnected,
    isConnecting,
    balance,
    formatAddress,
    connect,
    disconnect,
    connectors,
  }
}