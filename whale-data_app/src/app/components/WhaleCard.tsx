'use client'

import { User, TrendingUp, Activity, Users, CheckCircle, ExternalLink } from 'lucide-react'
import { Whale } from '../../types'

interface WhaleCardProps {
  whale: Whale
  isFollowing?: boolean
  onFollow?: (whaleId: string) => void
  onUnfollow?: (whaleId: string) => void
}

export function WhaleCard({ whale, isFollowing = false, onFollow, onUnfollow }: WhaleCardProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`
    }
    return `$${volume.toFixed(0)}`
  }

  return (
    <div className="bg-gray-700 rounded-lg p-6 border border-gray-600 hover:border-gray-500 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-white">{whale.name}</h3>
              {whale.isVerified && (
                <CheckCircle className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <p className="text-sm text-gray-400">{formatAddress(whale.address)}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {whale.description && (
        <p className="text-sm text-gray-300 mb-4">{whale.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {whale.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-400">Volume</span>
          </div>
          <p className="text-lg font-semibold text-white">{formatVolume(whale.totalVolume)}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Activity className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-400">Trades</span>
          </div>
          <p className="text-lg font-semibold text-white">{whale.totalTrades}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">{whale.followersCount} followers</span>
        </div>
        
        <button
          onClick={() => isFollowing ? onUnfollow?.(whale.id) : onFollow?.(whale.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isFollowing
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  )
} 