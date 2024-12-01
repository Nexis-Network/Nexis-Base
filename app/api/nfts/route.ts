import { NextResponse } from 'next/server';
import Moralis from 'moralis';
import { initMoralis, type SupportedChainId, SUPPORTED_CHAINS } from '@/lib/moralis';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const chain = searchParams.get('chain') as SupportedChainId | null;

  if (!address) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  if (!chain || !SUPPORTED_CHAINS.some(c => c.id === chain)) {
    return NextResponse.json({ error: 'Invalid chain' }, { status: 400 });
  }

  try {
    await initMoralis();

    const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
      chain,
      format: 'decimal',
      mediaItems: true,
      address,
      limit: 100,
    });

    const formattedNFTs = nfts.raw.result.map(nft => ({
      ...nft,
      metadata: typeof nft.metadata === 'string' 
        ? JSON.parse(nft.metadata) 
        : nft.metadata
    }));

    return NextResponse.json({ result: formattedNFTs });
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
} 