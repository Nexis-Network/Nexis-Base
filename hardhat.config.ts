import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "@openzeppelin/hardhat-upgrades";
import type { HardhatUserConfig } from "hardhat/config";

import networks from "./chains";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: networks,
  etherscan: {
    apiKey: {
      gravity: "no-op",
    },
    customChains: [
      {
        network: "gravity",
        chainId: 1625,
        urls: {
          apiURL: "https://explorer.gravity.xyz/api",
          browserURL: "https://explorer.gravity.xyz",
        },
      },
    ],
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./tests",
  },
};

export default config;
