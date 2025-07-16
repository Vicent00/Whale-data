"use client"

import { useState } from 'react'
import { Search, Filter, Users } from 'lucide-react'
import { WhaleCard } from '../../components/WhaleCard'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { useWhales } from '../../../hooks/useWhales'
import { Whale } from '../../../types'

export default function WhalesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'volume' | 'trades' | 'followers'>('volume')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)

  const { whales, loading, error, pagination, refetch } = useWhales({
    page,
    limit: 12,
    search: searchTerm,
    tags: selectedTags,
    sortBy,
    sortOrder,
  })

  const allTags = ['defi', 'yield-farming', 'nft', 'collector', 'meme', 'influencer']

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
    setPage(1) // Reset to first page when filters change
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Whales</h1>
        </div>
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-300 mb-2">Error loading whales</h3>
            <p className="text-red-400">{error}</p>
          </div>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Whales</h1>
        <div className="text-sm text-gray-400">
          {loading ? 'Loading...' : `${whales.length} of ${pagination?.total || 0} whales`}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search whales by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'volume' | 'trades' | 'followers')}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="volume">Volume</option>
              <option value="trades">Trades</option>
              <option value="followers">Followers</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition-colors"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Tags Filter */}
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Filter by tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-12">
          <LoadingSpinner size="lg" text="Loading whales..." />
        </div>
      )}

      {/* Whales Grid */}
      {!loading && whales.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whales.map((whale) => (
              <WhaleCard key={whale.id} whale={whale} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={!pagination.hasPrev}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>
              
              <span className="text-gray-400">
                Page {page} of {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={!pagination.hasNext}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && whales.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No whales found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
} 