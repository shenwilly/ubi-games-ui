import { UBI_ADDRESS } from "../constants/networks";

export const getUBIAddress = (chainId: number) => {
  return UBI_ADDRESS[chainId];
}