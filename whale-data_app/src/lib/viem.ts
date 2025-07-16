import { createPublicClient, http, getContract } from 'viem';
import { mainnet, polygon, bsc } from 'wagmi/chains';

// Public clients for different chains
export const ethereumClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL),
});

export const polygonClient = createPublicClient({
  chain: polygon,
  transport: http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL),
});

export const bscClient = createPublicClient({
  chain: bsc,
  transport: http(process.env.NEXT_PUBLIC_BSC_RPC_URL),
});

// Chain configuration mapping
export const chainConfigs = {
  ethereum: {
    client: ethereumClient,
    chain: mainnet,
    name: 'Ethereum',
  },
  polygon: {
    client: polygonClient,
    chain: polygon,
    name: 'Polygon',
  },
  bsc: {
    client: bscClient,
    chain: bsc,
    name: 'BSC',
  },
};

// Common contract ABIs
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
] as const;

// Utility functions for blockchain data
export async function getTokenInfo(tokenAddress: string, chain: 'ethereum' | 'polygon' | 'bsc') {
  const client = chainConfigs[chain].client;
  const contract = getContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    client,
  });

  try {
    const [name, symbol, decimals] = await Promise.all([
      contract.read.name(),
      contract.read.symbol(),
      contract.read.decimals(),
    ]);

    return { name, symbol, decimals };
  } catch (error) {
    console.error('Error fetching token info:', error);
    return null;
  }
}

export async function getBalance(address: string, tokenAddress: string, chain: 'ethereum' | 'polygon' | 'bsc') {
  const client = chainConfigs[chain].client;
  const contract = getContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    client,
  });

  try {
    const balance = await contract.read.balanceOf([address as `0x${string}`]);
    return balance;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return BigInt(0);
  }
} 