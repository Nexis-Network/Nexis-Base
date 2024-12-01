import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

interface WalletData {
  totalNZT: string;
  unlockedNZT: string;
  vestedNZT: string;
  estDailyUnlocked: number;
  vestingPeriod: number;
  delegatedNZT: string;
  nodeLicenses: string;
}

export function useWalletData() {
  const { address, isConnected } = useAccount();

  return useQuery<WalletData | null>({
    queryKey: ['walletData', address],
    queryFn: async () => {
      if (!address) return null;
      
      try {
        const response = await fetch(`/api/wallet?address=${address}`);
        if (!response.ok) {
          throw new Error('Failed to fetch wallet data');
        }
        const data: WalletData = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        throw new Error('Failed to fetch wallet data');
      }
    },
    enabled: isConnected && !!address,
  });
}
