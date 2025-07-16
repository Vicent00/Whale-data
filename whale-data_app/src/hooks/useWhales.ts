import { useState, useEffect } from 'react'
import { Whale } from '../types'

interface UseWhalesOptions {
  page?: number
  limit?: number
  search?: string
  tags?: string[]
  sortBy?: 'volume' | 'trades' | 'followers'
  sortOrder?: 'asc' | 'desc'
}

interface UseWhalesReturn {
  whales: Whale[]
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

export function useWhales(options: UseWhalesOptions = {}): UseWhalesReturn {
  const [whales, setWhales] = useState<Whale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<any>(null)

  const fetchWhales = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (options.page) params.append('page', options.page.toString())
      if (options.limit) params.append('limit', options.limit.toString())
      if (options.search) params.append('search', options.search)
      if (options.tags && options.tags.length > 0) params.append('tags', options.tags.join(','))
      if (options.sortBy) params.append('sortBy', options.sortBy)
      if (options.sortOrder) params.append('sortOrder', options.sortOrder)

      const response = await fetch(`/api/whales?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setWhales(data.data)
        setPagination(data.pagination)
      } else {
        setError(data.error || 'Failed to fetch whales')
      }
    } catch (err) {
      setError('Failed to fetch whales')
      console.error('Error fetching whales:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWhales()
  }, [options.page, options.limit, options.search, options.tags?.join(','), options.sortBy, options.sortOrder])

  return {
    whales,
    loading,
    error,
    pagination,
    refetch: fetchWhales,
  }
} 