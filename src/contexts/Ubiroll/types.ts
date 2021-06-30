import { BigNumber } from "ethers";

export interface ContextValues {
    ubiAddress: string,
    allowance: BigNumber
    isApproving: boolean,
    isApproved: boolean,
    onApprove: () => void
}
