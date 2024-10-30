export interface EvmWalletHistoryErc20Transfer {
  type: 'erc20';
  hash: `0x${string}`;
  from: `0x${string}`;
  to: `0x${string}`;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenLogo?: string;
  tokenDecimals: number;
}

export interface EvmWalletHistoryNftTransfer {
  type: 'nft';
  hash: `0x${string}`;
  from: `0x${string}`;
  to: `0x${string}`;
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  tokenLogo?: string;
  contractAddress: `0x${string}`;
}

export type EvmWalletHistoryTransfer = EvmWalletHistoryErc20Transfer | EvmWalletHistoryNftTransfer;
