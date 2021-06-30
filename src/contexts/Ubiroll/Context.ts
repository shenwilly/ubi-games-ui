import { BigNumber } from "ethers";
import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  ubiAddress: "",
  allowance: BigNumber.from(0),
  isApproving: false,
  isApproved: false,
  onApprove: () => {}
});

export default Context;
