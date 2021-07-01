import React, { useCallback, useState, useEffect } from "react";
import Context from "./Context";
import useWeb3 from "../../hooks/useWeb3";
import useApproval from "../../hooks/useApproval";
import { Web3Provider } from "@ethersproject/providers";
import { getUBIAddress } from "../../utils/ubi";
import { BigNumber, ethers } from "ethers";
import { getERC20Balance } from "../../utils/web3";
import { UBIROLL_ADDRESS, VAULT_ADDRESS } from "../../constants/address";
import { UbiGamesVault, Ubiroll } from "../../types/eth";
import UbirollAbi from "../../constants/abis/Ubiroll.json";
import VaultAbi from "../../constants/abis/UbiGamesVault.json";

const Provider: React.FC = ({ children }) => {
    const { accountAddress, chainId, web3Account, injectedProvider } = useWeb3();
    const [ ubiAddress, setUbiAddress ] = useState<string>("");
    const [ ubiBalance, setUbiBalance ] = useState<BigNumber>(BigNumber.from(0));
    const [ houseUbiBalance, setHouseUbiBalance ] = useState<BigNumber>(BigNumber.from(0));
    const { allowance, isApproving, isApproved, onApprove } = useApproval(ubiAddress, accountAddress);

    const fetchUBIBalance = async () => {
      if (accountAddress && ubiAddress && injectedProvider) {
        let balance = await getERC20Balance(accountAddress, ubiAddress, injectedProvider);
        setUbiBalance(balance);

        const vault = (new ethers.Contract(VAULT_ADDRESS, VaultAbi, injectedProvider)) as UbiGamesVault;
        let houseBalance = await vault.getUbiBalance();
        setHouseUbiBalance(houseBalance);
      } else {
        setUbiBalance(BigNumber.from(0));
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
        if (!amount || !chance || !injectedProvider || !web3Account) {
          return;
        }
        // const allowance = await getAllowance(userAddress, spenderAddress, tokenAddress, provider);
        // console.log("allowance", allowance);
        // setAllowance(BigNumber.from(allowance));
        const ubiroll = (new ethers.Contract(UBIROLL_ADDRESS, UbirollAbi, injectedProvider)) as Ubiroll;
        const tx =  await ubiroll.connect(web3Account).createBet(chance, amount);
        const receipt = await tx.wait();
        return receipt.status == 1;
      },
      [web3Account, injectedProvider]
    );
      
    return (
        <Context.Provider
            value={{
              ubiAddress,
              ubiBalance,
              houseUbiBalance,
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