'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, ExternalLink, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Transaction } from '../../types'

interface TransactionCardProps {
  transaction: Transaction
  showWhaleInfo?: boolean
}

export function TransactionCard({ transaction, showWhaleInfo = false }: TransactionCardProps) {
  const [formattedTime, setFormattedTime] = useState<string>('')
  const [formattedGas, setFormattedGas] = useState<string>('')

  useEffect(() => {
    setFormattedTime(transaction.timestamp.toLocaleTimeString())
    setFormattedGas(transaction.gasUsed?.toLocaleString() || '0')
  }, [transaction.timestamp, transaction.gasUsed])

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`
    }
    return `$${amount.toFixed(0)}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getProtocolColor = (protocol: string) => {
    const colors: Record<string, string> = {
      uniswap: 'bg-pink-600/20 text-pink-400',
      sushiswap: 'bg-green-600/20 text-green-400',
      opensea: 'bg-blue-600/20 text-blue-400',
      default: 'bg-gray-600/20 text-gray-400',
    }
    return colors[protocol.toLowerCase()] || colors.default
  }

  return (
    <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {showWhaleInfo && (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">W</span>
              </div>
              <span className="text-sm text-gray-300">{transaction.whale.name}</span>
            </div>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProtocolColor(transaction.protocol)}`}>
            {transaction.protocol}
          </span>
          <span className="text-xs text-gray-400 capitalize">{transaction.type}</span>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(transaction.status)}
          <button className="text-gray-400 hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">{transaction.tokenIn}</span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">{transaction.tokenOut}</span>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-white">
            {formatAmount(transaction.amountInUSD || 0)}
          </p>
          <p className="text-xs text-gray-400">
            {transaction.amountIn} {transaction.tokenIn} → {transaction.amountOut} {transaction.tokenOut}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <span>Block #{transaction.blockNumber}</span>
          <span>{formattedTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Gas: {formattedGas}</span>
          <span>Price: {transaction.gasPrice} gwei</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-600">
        <p className="text-xs text-gray-400 font-mono">
          {formatAddress(transaction.txHash)}
        </p>
      </div>
    </div>
  )
} 