'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAuth } from '../../hooks/useAuth'

export function WalletTest() {
  const { isConnected, address, formatAddress, balance, connect, disconnect, connectors } = useAuth()

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Wallet Connection Test</h2>
      
      <div className="space-y-4">
        {/* RainbowKit Connect Button */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">RainbowKit Connect Button:</h3>
          <ConnectButton />
        </div>

        {/* Custom Connect Buttons */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Custom Connect Buttons:</h3>
          <div className="flex flex-wrap gap-2">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect(connector.id)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Connect {connector.name}
              </button>
            ))}
          </div>
        </div>

        {/* Connection Status */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Connection Status:</h3>
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-white">
              Status: <span className={isConnected ? 'text-green-500' : 'text-red-500'}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </p>
            {isConnected && address && (
              <>
                <p className="text-white mt-1">
                  Address: <span className="text-blue-400">{formatAddress(address)}</span>
                </p>
                {balance && (
                  <p className="text-white mt-1">
                    Balance: <span className="text-green-400">
                      {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                    </span>
                  </p>
                )}
                <button
                  onClick={disconnect}
                  className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 