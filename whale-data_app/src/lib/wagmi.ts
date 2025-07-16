import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, bsc, sepolia } from 'wagmi/chains';

// WalletConnect Project ID - replace with your actual project ID
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'c16fa59cc1d3fd878780107ab11dbf04';

// Configure chains for the app
const chains = [
  mainnet,
  polygon,
  bsc,
  // Add testnet for development
  ...(process.env.NODE_ENV === 'development' ? [sepolia] : []),
] as const;

// Create wagmi config
const config = getDefaultConfig({
  appName: 'Whale Data',
  projectId,
  chains,
});

export { config };
export { chains }; 