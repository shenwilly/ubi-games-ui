import { BigNumber } from "ethers";
import { Bet } from "../../types";

export interface ContextValues {
    ubiAddress: string,
    ubiBalance: BigNumber,
    houseUbiBalance: BigNumber,
    minBet: BigNumber,
    allowance: BigNumber,
    isApproving: boolean,
    isApproved: boolean,
    bets: Bet[] | undefined,
    onApprove: () => void,
    createBet: (amount: BigNumber, chance: number) => Promise<boolean | undefined>,
}
