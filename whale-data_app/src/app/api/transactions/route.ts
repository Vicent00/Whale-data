import { NextRequest, NextResponse } from 'next/server'

// Mock data for transactions
const mockTransactions = [
  {
    id: '1',
    txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    whaleId: '1',
    whale: {
      id: '1',
      address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      name: 'Whale Alpha',
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
    timestamp: '2024-01-15T10:30:00Z',
    gasUsed: 150000,
    gasPrice: 25,
    status: 'confirmed',
  },
  {
    id: '2',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    whaleId: '2',
    whale: {
      id: '2',
      address: '0x8ba1f109551bD432803012645Hac136c22C177e9',
      name: 'Whale Beta',
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
    timestamp: '2024-01-15T09:15:00Z',
    gasUsed: 200000,
    gasPrice: 30,
    status: 'confirmed',
  },
  {
    id: '3',
    txHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
    whaleId: '3',
    whale: {
      id: '3',
      address: '0x1234567890abcdef1234567890abcdef12345678',
      name: 'Whale Gamma',
    },
    chain: 'polygon',
    protocol: 'quickswap',
    type: 'swap',
    tokenIn: 'MATIC',
    tokenOut: 'USDC',
    amountIn: 25000,
    amountOut: 25000,
    amountInUSD: 25000,
    amountOutUSD: 25000,
    blockNumber: 45000000,
    timestamp: '2024-01-15T08:45:00Z',
    gasUsed: 120000,
    gasPrice: 15,
    status: 'confirmed',
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const whaleId = searchParams.get('whaleId') || ''
    const chain = searchParams.get('chain') || ''
    const protocol = searchParams.get('protocol') || ''
    const type = searchParams.get('type') || ''
    const sortBy = searchParams.get('sortBy') || 'timestamp'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Filter transactions
    let filteredTransactions = mockTransactions.filter(tx => {
      const matchesWhale = !whaleId || tx.whaleId === whaleId
      const matchesChain = !chain || tx.chain === chain
      const matchesProtocol = !protocol || tx.protocol === protocol
      const matchesType = !type || tx.type === type
      
      return matchesWhale && matchesChain && matchesProtocol && matchesType
    })

    // Sort transactions
    filteredTransactions.sort((a, b) => {
      let aValue: number | string
      let bValue: number | string
      
      switch (sortBy) {
        case 'amount':
          aValue = a.amountInUSD || 0
          bValue = b.amountInUSD || 0
          break
        case 'timestamp':
          aValue = new Date(a.timestamp).getTime()
          bValue = new Date(b.timestamp).getTime()
          break
        case 'gasUsed':
          aValue = a.gasUsed || 0
          bValue = b.gasUsed || 0
          break
        default:
          aValue = new Date(a.timestamp).getTime()
          bValue = new Date(b.timestamp).getTime()
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return sortOrder === 'asc' 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex)

    const total = filteredTransactions.length
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: paginatedTransactions,
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
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.txHash || !body.whaleId) {
      return NextResponse.json(
        { success: false, error: 'Transaction hash and whale ID are required' },
        { status: 400 }
      )
    }

    // In a real app, you would save to database
    const newTransaction = {
      id: Date.now().toString(),
      txHash: body.txHash,
      whaleId: body.whaleId,
      whale: {
        id: body.whaleId,
        address: body.whaleAddress || '0x0000000000000000000000000000000000000000',
        name: body.whaleName || 'Unknown Whale',
      },
      chain: body.chain || 'ethereum',
      protocol: body.protocol || 'unknown',
      type: body.type || 'transfer',
      tokenIn: body.tokenIn || 'ETH',
      tokenOut: body.tokenOut || 'USDC',
      amountIn: body.amountIn || 0,
      amountOut: body.amountOut || 0,
      amountInUSD: body.amountInUSD || 0,
      amountOutUSD: body.amountOutUSD || 0,
      blockNumber: body.blockNumber || 0,
      timestamp: new Date().toISOString(),
      gasUsed: body.gasUsed || 0,
      gasPrice: body.gasPrice || 0,
      status: body.status || 'pending',
    }

    return NextResponse.json({
      success: true,
      data: newTransaction,
      message: 'Transaction created successfully',
    })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
} 