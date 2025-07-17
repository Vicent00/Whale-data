import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon } from 'wagmi/chains';

// WalletConnect Project ID - you should replace this with your actual project ID
// Get one from https://cloud.walletconnect.com/
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '8a4d50b11056e28882867b74aa01547e';

console.log(' Wagmi config - Project ID:', projectId);
console.log(' Wagmi config - Environment:', typeof window !== 'undefined' ? 'client' : 'server');

// Configure chains for the app - simplified to avoid WebSocket issues
const chains = [
  mainnet,
  polygon,
] as const;

console.log(' Wagmi config - Chains configured:', chains.length);

// Create wagmi config only on client side to avoid SSR issues
let config: any = null;

if (typeof window !== 'undefined') {
  console.log(' Wagmi config - Creating config on client side');
  try {
    config = getDefaultConfig({
      appName: 'Whale Data',
      projectId,
      chains,
      ssr: false, // Disable SSR for better client-side handling
    });
    console.log(' Wagmi config - Configuration created successfully');
  } catch (error) {
    console.error(' Wagmi config - Error creating config:', error);
    // Fallback config without custom transports
    config = getDefaultConfig({
      appName: 'Whale Data',
      projectId,
      chains,
      ssr: false,
    });
  }
} else {
  console.log(' Wagmi config - Server side, creating minimal config');
  // Minimal config for server side
  config = {
    appName: 'Whale Data',
    projectId,
    chains,
    ssr: false,
  };
}

export { config };
export { chains }; 