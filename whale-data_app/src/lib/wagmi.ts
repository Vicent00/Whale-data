import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon } from 'wagmi/chains';

// WalletConnect Project ID - Use a different one for development
// For production, get your own from https://cloud.walletconnect.com/
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '8a4d50b11056e28882867b74aa01547e';

// Configure chains for the app
const chains = [
  mainnet,
  polygon,
] as const;

// Create wagmi config with minimal settings to avoid connection issues
const config = getDefaultConfig({
  appName: 'Whale Data',
  projectId,
  chains,
  ssr: false,
});

export { config };
export { chains }; 