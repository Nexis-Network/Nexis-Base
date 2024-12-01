import type { Wallet } from "@rainbow-me/rainbowkit"
import { AuthAdapter } from "@web3auth/auth-adapter"
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { Web3AuthNoModal } from "@web3auth/no-modal"
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector"
import { Chain, createClient, http } from "viem"
import { configureChains } from "wagmi"
import { publicProvider } from "wagmi/providers/public"

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ" // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
})

const web3AuthInstance = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
  uiConfig: {
    mode: "dark",
    useLogoLoader: true,
    logoLight: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    logoDark: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    defaultLanguage: "en",
    theme: {
      primary: "#768729",
    },
  },
})
const authAdapter = new AuthAdapter({
  adapterSettings: {
    uxMode: UX_MODE.REDIRECT,
  },
})
web3AuthInstance.configureAdapter(authAdapter)

export const rainbowWeb3AuthConnector = (): Wallet => ({
  id: "web3auth",
  name: "web3auth",
  iconUrl:
    "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png",
  iconBackground: "#fff",
  installed: true,
  downloadUrls: {},
  createConnector: () => {
    const { chains, publicClient } = configureChains(
      [
        {
          id: 1,
          name: "Ethereum Mainnet",
          network: "homestead",
          rpcUrls: {
            default: {
              http: ["https://rpc.ankr.com/eth"],
            },
            public: {
              http: ["https://rpc.ankr.com/eth"],
            },
          },
          blockExplorers: {
            default: { url: "https://etherscan.io", name: "Etherscan" },
          },
          nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
          },
        },
        {
          id: 42161,
          name: "Arbitrum One",
          network: "arbitrum",
          rpcUrls: {
            default: { http: ["https://arb1.arbitrum.io/rpc"] },
            public: { http: ["https://arb1.arbitrum.io/rpc"] },
          },
          blockExplorers: {
            default: { url: "https://arbiscan.io", name: "Arbiscan" },
          },
          nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
          },
        },
        {
          id: 56,
          name: "Binance Smart Chain",
          network: "bsc",
          rpcUrls: {
            default: { http: ["https://bsc-dataseed.binance.org"] },
            public: { http: ["https://bsc-dataseed.binance.org"] },
          },
          blockExplorers: {
            default: { url: "https://bscscan.com", name: "BscScan" },
          },
          nativeCurrency: {
            name: "Binance Coin",
            symbol: "BNB",
            decimals: 18,
          },
        },
        {
          id: 8453, // Example ID for Base, replace with actual if different
          name: "Base",
          network: "base",
          rpcUrls: {
            default: { http: ["https://base-rpc-url.com"] },
            public: { http: ["https://base-rpc-url.com"] },
          },
          blockExplorers: {
            default: {
              url: "https://base-explorer-url.com",
              name: "Base Explorer",
            },
          },
          nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
          },
        },
      ],
      [publicProvider()]
    )
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const connector = new (Web3AuthConnector as any)({
      chains,
      options: {
        clientId,
        web3AuthInstance,
      },
    })
    return {
      connector,
    }
  },
})
