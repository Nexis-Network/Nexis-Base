export interface Token {
  portfolioPercentage: number;
  token: Token;
  price: number;
  priceChange24h: number;
  token_address: string;
  symbol: string;
  name: string;
  contractAddress: string
  logo?: string | React.ReactNode;
  decimals: number;
  balance: string;
  possible_spam: boolean;
  balance_usd: number;
  price_usd: number;
  price_change_24h: number;
  value: number;
  percent_change: number;
  portfolio_percentage: number;
  native_token: boolean;
  native_token_price_usd: number;
  native_token_balance: string;
  liquidity_usd: number;
  usd_price: number;
  amount: string
}