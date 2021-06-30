import React, { useCallback, useState, useEffect } from "react";
import Context from "./Context";
import { Web3Provider } from "@ethersproject/providers";
import { web3Modal } from "../../utils/web3modal";
import { Signer } from "ethers";
// import useAllowance from "../../hooks/useAllowance";
import useWeb3 from "../../hooks/useWeb3";
import useApproval from "../../hooks/useApproval";
import { getUBIAddress } from "../../utils/ubi";

const Provider: React.FC = ({ children }) => {
    const { accountAddress, chainId } = useWeb3();
    const [ubiAddress, setUbiAddress] = useState<string>("");
    const { allowance, isApproving, isApproved, onApprove } = useApproval(ubiAddress, accountAddress);

    useEffect(() => {
      if (chainId) {
        const tokenAddress = getUBIAddress(chainId);
        setUbiAddress(tokenAddress);
      }
    }, [chainId]);
    
    return (
        <Context.Provider
            value={{
              ubiAddress,
              allowance,
              isApproving,
              isApproved,
              onApprove,
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;