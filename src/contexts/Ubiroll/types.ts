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
    pendingBets: Bet[],
    onApprove: () => void,
    createBet: (amount: BigNumber, chance: number, payout?: BigNumber) => Promise<boolean | undefined>,
}
