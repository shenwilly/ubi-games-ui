import { ETHEREUM_CHAIN } from "../types";

export enum NETWORKS {
  MAINNET = 1,
  MATIC = 137
}

export const UBI_ADDRESS: {[key: number]: string} = {
  1: "0xdd1ad9a21ce722c151a836373babe42c868ce9a4",
  137: "0xFe7FF8b5dfbA93A9EaB7Aee447C3c72990052d93"
}

export const CHAIN_METADATA: {[key: number]: ETHEREUM_CHAIN} = {
  1: {
    chainId: "0x01",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  137: {
    chainId: "0x89",
    chainName: "Matic Network",
    nativeCurrency: {
      name: "MATIC Token",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc-mainnet.matic.network",
      "https://rpc-mainnet.maticvigil.com",
      "https://rpc-mainnet.matic.quiknode.pro",
      "https://matic-mainnet.chainstacklabs.com"
    ],
    blockExplorerUrls: [
      "https://polygonscan.com/"
    ],
  }
}