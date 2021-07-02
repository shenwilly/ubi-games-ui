import { NETWORK } from "../types";

export enum NETWORKS {
  MAINNET = 1,
  MATIC = 137
}

export const NETWORK_CONFIGS: {[key: number]: NETWORK} = {
  1: {
    name: "MAINNET",
    nativeCurrency: "ETH",
    ubi: "0xdd1ad9a21ce722c151a836373babe42c868ce9a4",
  },
  137: {
    name: "MATIC",
    nativeCurrency: "MATIC",
    ubi: "0xFe7FF8b5dfbA93A9EaB7Aee447C3c72990052d93",
  }
}