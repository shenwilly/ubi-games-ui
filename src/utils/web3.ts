import { BigNumber, ContractTransaction, ethers, providers, Signer } from "ethers";
import { NETWORK_CONFIGS } from "../constants/networks";
import { ERC20 } from "../types/eth";
import ERC20abi from "../constants/abis/ERC20.json";

export const getERC20 = (
    tokenAddress: string, 
    provider: providers.Provider
): ERC20 => {
    return (new ethers.Contract(tokenAddress, ERC20abi, provider)) as ERC20;
};

export const getAllowance = async (
    userAddress: string, 
    spenderAddress: string, 
    tokenAddress: string, 
    provider: providers.Provider
): Promise<BigNumber> => {
    const tokenContract = getERC20(tokenAddress, provider);
    try {
        const allowance = tokenContract.allowance(userAddress, spenderAddress);
        return allowance;
    } catch (e) {
        console.log(e)
        return BigNumber.from(0);
    }
};
  
export const getERC20Balance = async (
    userAddress: string,
    tokenAddress: string, 
    provider: providers.Provider 
): Promise<string> => {
    const tokenContract = getERC20(tokenAddress, provider);
    try {
        const balance: string = (await tokenContract.balanceOf(userAddress)).toString();
        return balance;
    } catch (e) {
        console.log(e)
        return "0";
    }
};
  
export const approve = async (
    spenderAddress: string,
    tokenAddress: string, 
    amount: BigNumber,
    provider: providers.Provider,
    signer: Signer,
): Promise<ContractTransaction> => {
    const tokenContract = getERC20(tokenAddress, provider);
    const tx = await tokenContract.connect(signer).approve(spenderAddress, BigNumber.from(amount))
    return tx;
};
  
export const getNativeCurrency = (chainId: number) => {
  const network = NETWORK_CONFIGS[chainId];
  return network?.nativeCurrency ?? "";
}