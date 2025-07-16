import { NextRequest, NextResponse } from 'next/server'

// Mock data for whales
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
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
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
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    name: 'Whale Gamma',
    description: 'Meme coin trader and influencer',
    tags: ['meme', 'influencer'],
    totalVolume: 5600000,
    totalTrades: 234,
    avgTradeSize: 23932,
    successRate: 78.3,
    followersCount: 567,
    isActive: true,
    isVerified: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const tags = searchParams.get('tags')?.split(',') || []
    const sortBy = searchParams.get('sortBy') || 'volume'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Filter whales based on search and tags
    let filteredWhales = mockWhales.filter(whale => {
      const matchesSearch = !search || 
        whale.name?.toLowerCase().includes(search.toLowerCase()) ||
        whale.address.toLowerCase().includes(search.toLowerCase())
      
      const matchesTags = tags.length === 0 || 
        tags.some(tag => whale.tags.includes(tag))
      
      return matchesSearch && matchesTags
    })

    // Sort whales
    filteredWhales.sort((a, b) => {
      let aValue: number
      let bValue: number
      
      switch (sortBy) {
        case 'volume':
          aValue = a.totalVolume
          bValue = b.totalVolume
          break
        case 'trades':
          aValue = a.totalTrades
          bValue = b.totalTrades
          break
        case 'followers':
          aValue = a.followersCount
          bValue = b.followersCount
          break
        default:
          aValue = a.totalVolume
          bValue = b.totalVolume
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedWhales = filteredWhales.slice(startIndex, endIndex)

    const total = filteredWhales.length
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: paginatedWhales,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error('Error fetching whales:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch whales' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.address) {
      return NextResponse.json(
        { success: false, error: 'Address is required' },
        { status: 400 }
      )
    }

    // In a real app, you would save to database
    const newWhale = {
      id: Date.now().toString(),
      address: body.address,
      name: body.name || `Whale ${Date.now()}`,
      description: body.description || '',
      tags: body.tags || [],
      totalVolume: 0,
      totalTrades: 0,
      avgTradeSize: 0,
      successRate: 0,
      followersCount: 0,
      isActive: true,
      isVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: newWhale,
      message: 'Whale created successfully',
    })
  } catch (error) {
    console.error('Error creating whale:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create whale' },
      { status: 500 }
    )
  }
} 