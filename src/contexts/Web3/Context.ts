import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
    web3Account: undefined,
    accountAddress: "",
    web3Modal: undefined,
    injectedProvider: undefined,
    chainId: undefined,
    changeNetwork: (_) => {},
    loadWeb3Modal: () => {},
    logoutOfWeb3Modal: () => {}
});

export default Context;
