import { NextResponse } from 'next/server';
import Moralis from 'moralis';
import { initMoralis, type SupportedChainId, SUPPORTED_CHAINS } from '@/lib/moralis';

interface TokenPriceResponse {
  tokenAddress: string;
  usdPrice: number;
  '24hr_change': number;
  tokenSymbol?: string;
  tokenLogo?: string;
  nativePrice?: {
    value: string;
    decimals: number;
    name: string;
    symbol: string;
    address: string;
  };
}

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

    // Get both ERC20 and native token balances
    const [tokenBalances, nativeBalance] = await Promise.all([
      Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain,
      }),
      Moralis.EvmApi.balance.getNativeBalance({
        address,
        chain,
      })
    ]);

    // Get token metadata and prices
    const tokenAddresses = tokenBalances.raw.map(token => token.token_address);
    const [tokenMetadata, tokenPricesPromises] = await Promise.all([
      Moralis.EvmApi.token.getTokenMetadata({
        addresses: tokenAddresses,
        chain,
      }),
      // Get price for each token individually
      Promise.all(
        tokenAddresses.map(address =>
          Moralis.EvmApi.token.getTokenPrice({
            address,
            chain,
            include: 'percent_change'
          }).catch(() => null)
        )
      )
    ]);

    // Get native token price
    const nativePriceResponse = await Moralis.EvmApi.token.getTokenPrice({
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH for ETH price
      chain: '0x1', // Always use mainnet for price
      include: 'percent_change'
    }).catch(() => null);

    // Format token balances with metadata and prices
    const formattedTokens = tokenBalances.raw.map((token, index) => {
      const metadata = tokenMetadata.raw.find(m => m.address.toLowerCase() === token.token_address.toLowerCase());
      const priceData = tokenPricesPromises[index]?.raw as TokenPriceResponse;
      const balance = Number(token.balance) / (10 ** token.decimals);
      const price = priceData?.usdPrice ?? 0;
      
      return {
        type: 'erc20' as const,
        token_address: token.token_address,
        name: metadata?.name || 'Unknown Token',
        symbol: metadata?.symbol || '???',
        logo: metadata?.thumbnail || null,
        decimals: token.decimals,
        balance: token.balance,
        price,
        price_change_24h: priceData?.['24hr_change'] ?? 0,
        usd_value: balance * price
      };
    });

    // Add native token
    const nativeTokenBalance = Number(nativeBalance.raw.balance) / (10 ** 18);
    const nativePriceData = nativePriceResponse?.raw as TokenPriceResponse;
    const nativePrice = nativePriceData?.usdPrice ?? 0;
    const nativeToken = {
      type: 'native' as const,
      token_address: '0x0000000000000000000000000000000000000000',
      name: chain === '0x1' ? 'Ethereum' : chain === '0x38' ? 'BNB' : 'ETH',
      symbol: chain === '0x1' ? 'ETH' : chain === '0x38' ? 'BNB' : 'ETH',
      logo: null,
      decimals: 18,
      balance: nativeBalance.raw.balance,
      price: nativePrice,
      price_change_24h: nativePriceData?.['24hr_change'] ?? 0,
      usd_value: nativeTokenBalance * nativePrice
    };

    const allTokens = [nativeToken, ...formattedTokens];
    const totalPortfolioValue = allTokens.reduce((sum, token) => sum + token.usd_value, 0);

    return NextResponse.json({ 
      tokens: allTokens,
      totalPortfolioValue 
    });
  } catch (error) {
    console.error('Error fetching token balances:', error);
    return NextResponse.json({ error: 'Failed to fetch token balances' }, { status: 500 });
  }
} 