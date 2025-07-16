'use client'

import { useState } from 'react'
import { Search, Filter, Activity } from 'lucide-react'
import { TransactionCard } from '../../../app/components/TransactionCard'
import { Transaction } from '../../../types'

// Mock data for demonstration
const mockTransactions: Transaction[] = [
  {
    id: '1',
    txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    whaleId: '1',
    whale: {
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
    whale: {
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

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'amount' | 'timestamp' | 'gasUsed'>('timestamp')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)

  // Filtering and sorting logic (mock)
  const filteredTransactions = mockTransactions
    .filter(tx =>
      tx.whale.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.txHash.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: number | Date
      let bValue: number | Date
      
      switch (sortBy) {
        case 'amount':
          aValue = a.amountInUSD || 0
          bValue = b.amountInUSD || 0
          break
        case 'timestamp':
          aValue = a.timestamp
          bValue = b.timestamp
          break
        case 'gasUsed':
          aValue = a.gasUsed || 0
          bValue = b.gasUsed || 0
          break
        default:
          aValue = a.timestamp
          bValue = b.timestamp
      }
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortOrder === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime()
      }
      
      return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
    })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Transactions</h1>
        <div className="text-sm text-gray-400">
          {filteredTransactions.length} transactions
        </div>
      </div>

      {/* Search and Sort */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by whale or tx hash..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'amount' | 'timestamp' | 'gasUsed')}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="timestamp">Date</option>
              <option value="amount">Amount</option>
              <option value="gasUsed">Gas Used</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition-colors"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.map(tx => (
          <TransactionCard key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  )
} 