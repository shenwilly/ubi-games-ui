import { NETWORK_CONFIGS } from "../constants/networks";

export const getUBIAddress = (chainId: number) => {
  const network = NETWORK_CONFIGS[chainId];
  return network?.ubi ?? "";
}