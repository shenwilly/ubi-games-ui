import { BigNumber } from "ethers";
import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  ubiAddress: "",
  ubiBalance: BigNumber.from(0),
  houseUbiBalance: BigNumber.from(0),
  minBet: BigNumber.from(0),
  allowance: BigNumber.from(0),
  isApproving: false,
  isApproved: false,
  bets: undefined,
  pendingBets: [],
  onApprove: () => {},
  createBet: async () => undefined
});

export default Context;
