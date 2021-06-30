import { NETWORK } from "../types";

export const NETWORK_CONFIGS: {[key: number]: NETWORK} = {
  1: {
    name: "MAINNET",
    nativeCurrency: "ETH",
    ubi: "",
  },
  137: {
    name: "MATIC",
    nativeCurrency: "MATIC",
    ubi: "0xFe7FF8b5dfbA93A9EaB7Aee447C3c72990052d93",
  }
}