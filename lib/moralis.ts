import Moralis from 'moralis';

export type SupportedChainId = '0x1' | '0xa4b1' | '0x8453' | '0x38';

export const SUPPORTED_CHAINS = [
  { id: '0x1', name: 'Ethereum' },
  { id: '0xa4b1', name: 'Arbitrum' },
  { id: '0x8453', name: 'Base' },
  { id: '0x38', name: 'BNB Smart Chain' },
] as const;

export async function initMoralis() {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });
  }
} 