'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, AlertTriangle } from 'lucide-react'
import { WhaleCard } from './WhaleCard'
import { TransactionCard } from './TransactionCard'
import { VolumeChart } from './VolumeChart'
import { WalletStatus } from './WalletStatus'
import { Whale, Transaction } from '../../types'

// Mock data for demonstration
const mockWhales = [
  {
    id: '1',
    address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    name: 'Whale Alpha',
    description: 'DeFi yield farmer and liquidity provider',
    tags: ['defi', 'yield-farming'],
    totalVolume: 12500000,
    totalTrades: 156,
    avgTradeSize: 80128,
    successRate: 87.5,
    followersCount: 1247,
    isActive: true,
    isVerified: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    transactions: [],
    followedBy: [],
  },
  {
    id: '2',
    address: '0x8ba1f109551bD432803012645Hac136c22C177e9',
    name: 'Whale Beta',
    description: 'NFT trader and collector',
    tags: ['nft', 'collector'],
    totalVolume: 8900000,
    totalTrades: 89,
    avgTradeSize: 100000,
    successRate: 92.1,
    followersCount: 892,
    isActive: true,
    isVerified: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    transactions: [],
    followedBy: [],
  },
]

const mockTransactions = [
  {
    id: '1',
    txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    whaleId: '1',
    whale: mockWhales[0],
    chain: 'ethereum',
    protocol: 'uniswap',
    type: 'swap',
    tokenIn: 'USDC',
    tokenOut: 'ETH',
    amountIn: 50000,
    amountOut: 25.5,
    amountInUSD: 50000,
    amountOutUSD: 50000,
    blockNumber: 19000000,
    timestamp: new Date('2024-01-15T10:30:00Z'),
    gasUsed: 150000,
    gasPrice: 25,
    status: 'confirmed',
    createdAt: new Date('2024-01-15T10:30:00Z'),
  },
  {
    id: '2',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    whaleId: '2',
    whale: mockWhales[1],
    chain: 'ethereum',
    protocol: 'opensea',
    type: 'transfer',
    tokenIn: 'ETH',
    tokenOut: 'NFT',
    amountIn: 100000,
    amountOut: 1,
    amountInUSD: 100000,
    amountOutUSD: 100000,
    blockNumber: 19000001,
    timestamp: new Date('2024-01-15T09:15:00Z'),
    gasUsed: 200000,
    gasPrice: 30,
    status: 'confirmed',
    createdAt: new Date('2024-01-15T09:15:00Z'),
  },
]

const stats = [
  {
    name: 'Total Volume',
    value: '$45.2M',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: DollarSign,
  },
  {
    name: 'Active Whales',
    value: '1,234',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    name: 'Total Trades',
    value: '8,567',
    change: '+15.3%',
    changeType: 'positive' as const,
    icon: Activity,
  },
  {
    name: 'Alerts',
    value: '23',
    change: '-5.1%',
    changeType: 'negative' as const,
    icon: AlertTriangle,
  },
]

export function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState<string>('')

  useEffect(() => {
    setLastUpdated(new Date().toLocaleString())
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="text-sm text-gray-400">
          Last updated: {lastUpdated}
        </div>
      </div>

      {/* Wallet Status */}
      <WalletStatus />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.changeType === 'positive' ? 'bg-green-500/10' : 'bg-red-500/10'
              }`}>
                <stat.icon className={`w-5 h-5 ${
                  stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`} />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              {stat.changeType === 'positive' ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${
                stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-400 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Volume Overview</h3>
          <VolumeChart />
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction as Transaction} />
            ))}
          </div>
        </div>
      </div>

      {/* Top Whales */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Top Whales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWhales.map((whale) => (
            <WhaleCard key={whale.id} whale={whale as Whale} />
          ))}
        </div>
      </div>
    </div>
  )
} 