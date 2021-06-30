import { useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { Button, Box, Flex, Text, useDisclosure } from "@chakra-ui/react"
import useWeb3 from "../../hooks/useWeb3";
import { Web3Provider } from "@ethersproject/providers";
import Web3AccountModal from "../Web3AccountModal";
import { getERC20Balance, getNativeCurrency } from "../../utils/web3";
import { getUBIAddress } from "../../utils/ubi";
// import AccountModal from "../AccountModal";

const Web3Account = () => {
    const { web3Modal, loadWeb3Modal, logoutOfWeb3Modal, injectedProvider, accountAddress, chainId } = useWeb3()
    const [ ubiBalance, setUbiBalance ] = useState("-");
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const getUBIBalance = async (provider: Web3Provider, chainId: number) => {
            let balance = await getERC20Balance(accountAddress, getUBIAddress(chainId), provider);
            setUbiBalance(truncateBalance(formatEther(balance), 4));
        }

        if (injectedProvider && accountAddress && chainId) {
            injectedProvider.on("block", (_) => {
                getUBIBalance(injectedProvider, chainId);
            })
        } else {
            setUbiBalance("-")
        }
        console.log(injectedProvider, accountAddress, "??");
    }, [injectedProvider, accountAddress, chainId])
    
    function truncateBalance(str: string, maxDecimalDigits: number) {
        if (str.includes('.')) {
            const parts = str.split('.');
            return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
        }
        return str;
    }

    function truncateAddress(str: string) {
        return str.substr(0, 5) + "..." + str.substr(str.length - 4, 5);
    }

    return (
        <Flex align="center">
            {injectedProvider &&
                (<Box display="flex" p="2" borderRadius="8" onClick={onOpen} cursor="pointer">
                    <Box px="2">
                        <Text>
                            {ubiBalance} UBI
                        </Text>
                    </Box>
                    <Box px="2">
                        <Text>
                            {truncateAddress(accountAddress)}
                        </Text>
                    </Box>
                </Box>)
            }
            <Box ml="2">
                {web3Modal && !web3Modal.cachedProvider &&
                    <Button onClick={loadWeb3Modal} >Connect to Wallet</Button>}
            </Box>
            <Web3AccountModal 
                isOpen={isOpen} 
                onClose={onClose}
                logoutOfWeb3Modal={logoutOfWeb3Modal}
                address={accountAddress} />
        </Flex>
    );
};

export default Web3Account;