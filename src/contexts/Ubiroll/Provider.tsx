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
import { NETWORKS } from "../../constants/networks";
import useFetch, { CachePolicies } from 'use-http'
import { UBIROLL_GRAPH_ENDPOINT } from "../../constants";
import { Bet } from "../../types";

const Provider: React.FC = ({ children }) => {
    const { accountAddress, chainId, web3Account, injectedProvider } = useWeb3();
    const [ ubiAddress, setUbiAddress ] = useState<string>("");
    const [ ubiBalance, setUbiBalance ] = useState<BigNumber>(BigNumber.from(0));
    const [ minBet, setMinBet ] = useState<BigNumber>(BigNumber.from(0));
    const [ houseUbiBalance, setHouseUbiBalance ] = useState<BigNumber>(BigNumber.from(0));
    const [ bets, setBets ] = useState<Bet[]>();
    const { allowance, isApproving, isApproved, onApprove } = useApproval(ubiAddress, VAULT_ADDRESS);
    const { query:ubirollGqlQuery } = useFetch(UBIROLL_GRAPH_ENDPOINT, {cachePolicy: CachePolicies.NO_CACHE});

    const fetchUBIBalance = useCallback(async () => {
      if (accountAddress && ubiAddress && injectedProvider) {
        let balance = await getERC20Balance(accountAddress, ubiAddress, injectedProvider);
        setUbiBalance(balance);
      } else {
        setUbiBalance(BigNumber.from(0));
      }
    }, [accountAddress, ubiAddress, injectedProvider])

    const fetchHouseBalance = useCallback(async () => {
      if (injectedProvider && chainId === NETWORKS.MATIC) {
        const vault = (new ethers.Contract(VAULT_ADDRESS, VaultAbi, injectedProvider)) as UbiGamesVault;
        let houseBalance = await vault.getUbiBalance();
        setHouseUbiBalance(houseBalance);
      } else {
        setHouseUbiBalance(BigNumber.from(0));
      }
    }, [injectedProvider, chainId])

    const fetchMinBet = useCallback(async () => {
      if (injectedProvider && chainId === NETWORKS.MATIC) {
        const ubiroll = (new ethers.Contract(UBIROLL_ADDRESS, UbirollAbi, injectedProvider)) as Ubiroll;
        let amount = await ubiroll.minBet();
        setMinBet(amount);
      } else {
        setMinBet(BigNumber.from(0));
      }
    }, [injectedProvider, chainId])

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
    }, [injectedProvider, accountAddress, ubiAddress, fetchUBIBalance])

    useEffect(() => {
      fetchHouseBalance();
      let refreshInterval = setInterval(fetchHouseBalance, 10000);
      return () => clearInterval(refreshInterval);
    }, [injectedProvider, chainId, fetchHouseBalance])

    useEffect(() => {
      fetchMinBet();
      let refreshInterval = setInterval(fetchMinBet, 30000);
      return () => clearInterval(refreshInterval);
    }, [injectedProvider, chainId, fetchMinBet])

    const createBet = useCallback(
      async (amount: BigNumber, chance: number) => {
        if (!amount || !chance || !injectedProvider || !web3Account) {
          return;
        }
        
        const ubiroll = (new ethers.Contract(UBIROLL_ADDRESS, UbirollAbi, injectedProvider)) as Ubiroll;
        const tx =  await ubiroll.connect(web3Account).createBet(chance, amount);
        const receipt = await tx.wait();
        return receipt.status === 1;
      },
      [web3Account, injectedProvider]
    );

    useEffect(() => {
      if (!ubirollGqlQuery || !accountAddress) return;

      const fetchBets = async () => {
        const response = await ubirollGqlQuery(QUERY, {
          player: accountAddress
        });
        const bets: Bet[] = response.data.bets;
        setBets(bets);
      }
      fetchBets();
      let refreshInterval = setInterval(fetchBets, 10000);
      return () => clearInterval(refreshInterval);
    }, [ubirollGqlQuery, accountAddress])
      
    return (
        <Context.Provider
            value={{
              ubiAddress,
              ubiBalance,
              houseUbiBalance,
              minBet,
              allowance,
              isApproving,
              isApproved,
              bets,
              onApprove,
              createBet,
            }}>
            {children}
        </Context.Provider>
    );
};

const QUERY = `
  query fetchBets($player: String!) {
    bets(
      where: {
        player: $player
      },
      orderBy: id, 
      orderDirection: desc
    ) {
      id
      player
      chance
      amount
      result
      prize
      win
      finished
      timestamp
    }
  }
`;

export default Provider;