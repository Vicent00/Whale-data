// User types
export interface User {
  id: string;
  wallet: string;
  email?: string;
  username?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences?: UserPreferences;
  alerts: Alert[];
  followedWhales: FollowedWhale[];
}

export interface UserPreferences {
  id: string;
  userId: string;
  defaultChain: string;
  currency: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  theme: string;
  compactMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Whale types
export interface Whale {
  id: string;
  address: string;
  name?: string;
  description?: string;
  tags: string[];
  totalVolume: number;
  totalTrades: number;
  avgTradeSize: number;
  successRate: number;
  followersCount: number;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  transactions: Transaction[];
  followedBy: FollowedWhale[];
}

export interface FollowedWhale {
  id: string;
  userId: string;
  whaleId: string;
  createdAt: Date;
  user: User;
  whale: Whale;
}

// Transaction types
export interface Transaction {
  id: string;
  txHash: string;
  whaleId: string;
  whale: Whale;
  chain: string;
  protocol: string;
  type: string;
  tokenIn?: string;
  tokenOut?: string;
  amountIn?: number;
  amountOut?: number;
  amountInUSD?: number;
  amountOutUSD?: number;
  blockNumber: number;
  timestamp: Date;
  gasUsed?: number;
  gasPrice?: number;
  status: string;
  createdAt: Date;
}

// Alert types
export interface Alert {
  id: string;
  userId: string;
  user: User;
  type: string;
  whaleId?: string;
  whale?: Whale;
  minVolume?: number;
  minTradeSize?: number;
  emailEnabled: boolean;
  pushEnabled: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Whale metrics types
export interface WhaleMetrics {
  id: string;
  whaleId: string;
  whale: Whale;
  date: Date;
  volume: number;
  trades: number;
  avgTradeSize: number;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter types
export interface WhaleFilters {
  chain?: string;
  minVolume?: number;
  maxVolume?: number;
  tags?: string[];
  isVerified?: boolean;
  sortBy?: 'volume' | 'trades' | 'followers' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface TransactionFilters {
  whaleId?: string;
  chain?: string;
  protocol?: string;
  type?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: Date;
  endDate?: Date;
  sortBy?: 'amount' | 'timestamp' | 'gasUsed';
  sortOrder?: 'asc' | 'desc';
}

// Chart data types
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface VolumeChartData {
  whaleId: string;
  whaleName: string;
  data: ChartDataPoint[];
}

export interface TradeFrequencyData {
  whaleId: string;
  whaleName: string;
  trades: number;
  volume: number;
  avgTradeSize: number;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'whale_activity' | 'volume_threshold' | 'price_movement';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
}

// WebSocket types
export interface WebSocketMessage {
  type: 'transaction' | 'whale_update' | 'alert';
  data: any;
  timestamp: Date;
}

// Blockchain types
export type ChainType = 'ethereum' | 'polygon' | 'bsc';

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  chain: ChainType;
}

export interface BalanceInfo {
  tokenAddress: string;
  balance: bigint;
  symbol: string;
  decimals: number;
  usdValue?: number;
}

// Component props types
export interface WhaleCardProps {
  whale: Whale;
  isFollowing?: boolean;
  onFollow?: (whaleId: string) => void;
  onUnfollow?: (whaleId: string) => void;
}

export interface TransactionCardProps {
  transaction: Transaction;
  showWhaleInfo?: boolean;
}

export interface AlertCardProps {
  alert: Alert;
  onEdit?: (alert: Alert) => void;
  onDelete?: (alertId: string) => void;
  onToggle?: (alertId: string, isActive: boolean) => void;
}

// Form types
export interface CreateAlertForm {
  type: string;
  whaleId?: string;
  minVolume?: number;
  minTradeSize?: number;
  emailEnabled: boolean;
  pushEnabled: boolean;
}

export interface UserProfileForm {
  username?: string;
  email?: string;
  avatar?: string;
  preferences: Partial<UserPreferences>;
} 