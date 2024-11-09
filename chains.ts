import { HardhatUserConfig } from "hardhat/config";

const ZERO_BYTES32 = "0x0000000000000000000000000000000000000000000000000000000000000000";

const owner = process.env.OWNER ? process.env.OWNER : ZERO_BYTES32;

export const networks = {
  hardhat: {
    chainId: 31337,
  },
  gravity: {
    chainId: 1625,
    url: "https://rpc.gravity.xyz",
    accounts: [owner],
  },
  mainnet: {
    chainId: 1,
    url: process.env.MAINNET_RPC_URL || "",
    accounts: [owner],
  },
  sepolia: {
    chainId: 11155111,
    url: process.env.SEPOLIA_RPC_URL || "",
    accounts: [owner],
  },
  arbitrum: {
    chainId: 42161,
    url: process.env.ARBITRUM_RPC_URL || "",
    accounts: [owner],
  },
  bsc: {
    chainId: 56,
    url: process.env.BSC_RPC_URL || "",
    accounts: [owner],
  },
  base: {
    chainId: 8453,
    url: process.env.BASE_RPC_URL || "",
    accounts: [owner],
  },
};