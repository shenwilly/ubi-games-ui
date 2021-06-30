import { constants, BigNumber } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { useCallback, useState, useEffect } from "react";
import { approve, getAllowance } from "../utils/web3";
import useWeb3 from "./useWeb3";

const useApproval = (tokenAddress?: string, spenderAddress?: string) => {
  const [allowance, setAllowance] = useState<BigNumber>(BigNumber.from(0));
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const { accountAddress, web3Account, injectedProvider } = useWeb3();

  const fetchAllowance = useCallback(
    async (userAddress: string, provider: Web3Provider) => {
      if (!spenderAddress || !tokenAddress) {
        return;
      }
      const allowance = await getAllowance(userAddress, spenderAddress, tokenAddress, provider);
      console.log("allowance", allowance);
      setAllowance(BigNumber.from(allowance));
    },
    [setAllowance, spenderAddress, tokenAddress]
  );

  const handleApprove = useCallback(async () => {
    if (!web3Account || !injectedProvider || !spenderAddress || !tokenAddress) {
      return;
    }
    try {
      setIsApproving(true);
      const tx = await approve(spenderAddress, tokenAddress, constants.MaxUint256, injectedProvider, web3Account);
      const receipt = await tx.wait();
      setIsApproved(receipt.status == 1);
      setIsApproving(false);
    } catch (e) {
      setIsApproving(false);
      return false;
    }
  }, [web3Account, injectedProvider, setIsApproved, setIsApproving, spenderAddress, tokenAddress]);

  useEffect(() => {
    if (!!allowance?.toNumber()) {
      setIsApproved(true);
    }
  }, [allowance, setIsApproved]);

  useEffect(() => {
    if (accountAddress && injectedProvider && spenderAddress && tokenAddress) {
      fetchAllowance(accountAddress, injectedProvider);
    }
    let refreshInterval = setInterval(fetchAllowance, 10000);
    return () => clearInterval(refreshInterval);
  }, [accountAddress, injectedProvider, spenderAddress, tokenAddress]);

  return {
    allowance,
    isApproved,
    isApproving,
    onApprove: handleApprove,
  };
};

export default useApproval;
