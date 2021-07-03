import { providers, Signer } from "ethers";
import Web3Modal from "web3modal";
import { NETWORKS } from "../../constants";

export interface ContextValues {
    web3Account?: Signer,
    accountAddress: string,
    injectedProvider?: providers.Web3Provider,
    web3Modal?: Web3Modal,
    chainId?: number,
    changeNetwork: (network: NETWORKS) => void,
    loadWeb3Modal: () => void,
    logoutOfWeb3Modal: () => void,
}
