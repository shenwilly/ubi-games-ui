// import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
// import { INFURA_ID } from "../constants"

export const web3Modal = new Web3Modal({
    // network: "matic",
    cacheProvider: true,
    // providerOptions: {
    //     walletconnect: {
    //         package: WalletConnectProvider,
    //         options: {
    //             infuraId: INFURA_ID,
    //             rpc: {
    //                 137: "https://rpc-mainnet.maticvigil.com",
    //             },
    //         },
    //     },
    // },
});