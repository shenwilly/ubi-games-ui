import React, { useCallback, useState, useEffect } from "react";
import Context from "./Context";
import { Web3Provider } from "@ethersproject/providers";
import { web3Modal } from "../../utils/web3modal";
import { Signer } from "ethers";

const Provider: React.FC = ({ children }) => {
    const [web3Account, setWeb3Account] = useState<Signer>();
    const [accountAddress, setAccountAddress] = useState<string>("");
    const [injectedProvider, setInjectedProvider] = useState<Web3Provider>();
    const [chainId, setChainId] = useState<number>();

    const loadWeb3Modal = useCallback(async () => {
        const provider = await web3Modal.connect();
        const web3Provider = new Web3Provider(provider)
        setInjectedProvider(web3Provider);

        const signer = web3Provider.getSigner(0);
        setWeb3Account(signer);

        const address = await signer.getAddress();
        setAccountAddress(address);

        const network = await web3Provider.getNetwork();
        setChainId(network.chainId);
    }, [setInjectedProvider]);

    const logoutOfWeb3Modal = async () => {
        web3Modal.clearCachedProvider();
        setTimeout(() => {
            window.location.reload();
        }, 1);
    };

    useEffect(() => {
        if (web3Modal.cachedProvider) {
          loadWeb3Modal();
        }
    }, [loadWeb3Modal]);

    useEffect(() => {
        window.ethereum &&
        window.ethereum.on("chainChanged", () => {
        web3Modal.cachedProvider &&
            setTimeout(() => {
            window.location.reload();
            }, 1);
        });

        window.ethereum &&
        window.ethereum.on("accountsChanged", () => {
        web3Modal.cachedProvider &&
            setTimeout(() => {
            window.location.reload();
            }, 1);
        });
    }, []);
    
    return (
        <Context.Provider
            value={{
                web3Account,
                accountAddress,
                injectedProvider,
                web3Modal,
                chainId,
                loadWeb3Modal,
                logoutOfWeb3Modal,
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;