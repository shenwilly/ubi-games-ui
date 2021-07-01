import { BigNumber } from "ethers";

export interface ContextValues {
    ubiAddress: string,
    ubiBalance: BigNumber,
    houseUbiBalance: BigNumber,
    allowance: BigNumber,
    isApproving: boolean,
    isApproved: boolean,
    onApprove: () => void,
    createBet: (amount: BigNumber, chance: number) => Promise<boolean | undefined>,
}
