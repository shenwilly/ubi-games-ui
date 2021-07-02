import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";

export const formatBN = (number: BigNumber, decimals: number = 2) => {
  return parseFloat(formatUnits(number, 18)).toFixed(decimals);
}