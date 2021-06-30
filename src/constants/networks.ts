import { NETWORK } from "../types";

export const NETWORK_CONFIGS: {[key: number]: NETWORK} = {
  1: {
    name: "MAINNET",
    nativeCurrency: "ETH",
  },
  137: {
    name: "MATIC",
    nativeCurrency: "MATIC",
  }
}