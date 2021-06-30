import React, { useCallback, useState, useEffect } from "react";
import Context from "./Context";
import useWeb3 from "../../hooks/useWeb3";
import useApproval from "../../hooks/useApproval";
import { Web3Provider } from "@ethersproject/providers";
import { getUBIAddress } from "../../utils/ubi";
import { BigNumber } from "ethers";
import { getERC20Balance } from "../../utils/web3";

const Provider: React.FC = ({ children }) => {
    const { accountAddress, chainId, web3Account, injectedProvider } = useWeb3();
    const [ ubiAddress, setUbiAddress ] = useState<string>("");
    const [ ubiBalance, setUbiBalance ] = useState<BigNumber>(BigNumber.from(0));
    const { allowance, isApproving, isApproved, onApprove } = useApproval(ubiAddress, accountAddress);

    const fetchUBIBalance = async () => {
      if (accountAddress && ubiAddress && injectedProvider) {
        let balance = await getERC20Balance(accountAddress, ubiAddress, injectedProvider);
        setUbiBalance(balance);
      } else {
        setUbiBalance(BigNumber.from(0));
      }
    }

    useEffect(() => {
      if (chainId) {
        const tokenAddress = getUBIAddress(chainId);
        setUbiAddress(tokenAddress);
      }
    }, [chainId]);

    useEffect(() => {
      fetchUBIBalance();
      let refreshInterval = setInterval(fetchUBIBalance, 10000);
      return () => clearInterval(refreshInterval);
    }, [injectedProvider, accountAddress, ubiAddress])

    const createBet = useCallback(
      async (amount: BigNumber, chance: number) => {
        if (!amount || !chance) {
          return;
        }
        // const allowance = await getAllowance(userAddress, spenderAddress, tokenAddress, provider);
        // console.log("allowance", allowance);
        // setAllowance(BigNumber.from(allowance));
        if (chainId) {
          return true;

        } else {
          return false;
        }
      },
      [web3Account, injectedProvider]
    );
      
    return (
        <Context.Provider
            value={{
              ubiAddress,
              ubiBalance,
              allowance,
              isApproving,
              isApproved,
              onApprove,
              createBet,
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;