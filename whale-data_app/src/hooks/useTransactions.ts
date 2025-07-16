import { useState, useEffect } from 'react'
import { Transaction } from '../types'

interface UseTransactionsOptions {
  page?: number
  limit?: number
  whaleId?: string
  chain?: string
  protocol?: string
  type?: string
  sortBy?: 'amount' | 'timestamp' | 'gasUsed'
  sortOrder?: 'asc' | 'desc'
}

interface UseTransactionsReturn {
  transactions: Transaction[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  } | null
  refetch: () => void
}

export function useTransactions(options: UseTransactionsOptions = {}): UseTransactionsReturn {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<any>(null)

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (options.page) params.append('page', options.page.toString())
      if (options.limit) params.append('limit', options.limit.toString())
      if (options.whaleId) params.append('whaleId', options.whaleId)
      if (options.chain) params.append('chain', options.chain)
      if (options.protocol) params.append('protocol', options.protocol)
      if (options.type) params.append('type', options.type)
      if (options.sortBy) params.append('sortBy', options.sortBy)
      if (options.sortOrder) params.append('sortOrder', options.sortOrder)

      const response = await fetch(`/api/transactions?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        // Convert API data to Transaction type
        const formattedTransactions: Transaction[] = data.data.map((tx: any) => ({
          ...tx,
          timestamp: new Date(tx.timestamp),
          createdAt: new Date(tx.timestamp),
          whale: {
            ...tx.whale,
            transactions: [],
            followedBy: [],
          },
        }))
        
        setTransactions(formattedTransactions)
        setPagination(data.pagination)
      } else {
        setError(data.error || 'Failed to fetch transactions')
      }
    } catch (err) {
      setError('Failed to fetch transactions')
      console.error('Error fetching transactions:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [
    options.page, 
    options.limit, 
    options.whaleId, 
    options.chain, 
    options.protocol, 
    options.type, 
    options.sortBy, 
    options.sortOrder
  ])

  return {
    transactions,
    loading,
    error,
    pagination,
    refetch: fetchTransactions,
  }
} 