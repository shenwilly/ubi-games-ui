import { useCallback } from "react";
import { Button, Box, Flex, Text, useDisclosure } from "@chakra-ui/react"
import useWeb3 from "../../hooks/useWeb3";
import Web3AccountModal from "../Web3AccountModal";
import useUbiroll from "../../hooks/useUbiroll";
import { formatUnits } from "ethers/lib/utils";
import UbiModal from "../UbiModal";

const Web3Account = () => {
    const { web3Modal, loadWeb3Modal, logoutOfWeb3Modal, injectedProvider, accountAddress } = useWeb3()
    const { ubiBalance } = useUbiroll()
    const accountModal = useDisclosure()
    const ubiModal = useDisclosure()

    const ubiBalanceLabel = useCallback(() => {
        return truncateBalance(formatUnits(ubiBalance, 18), 4);
    }, [ubiBalance]);

    function truncateBalance(str: string, maxDecimalDigits: number) {
        if (str.includes('.')) {
            const parts = str.split('.');
            return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
        }
        return str;
    }

    function truncateAddress(str: string) {
        return str.substr(0, 6) + "..." + str.substr(str.length - 5, 6);
    }

    return (
        <Flex align="center">
            {injectedProvider &&
                (<Box display="flex" p="2" borderRadius="8">
                    <Box px="2" py="1" border="1px" borderColor="black.200" cursor="pointer"
                        borderRadius={15} mr={4} 
                        onClick={ubiModal.onOpen}>
                        <Text>
                            {ubiBalanceLabel()} UBI
                        </Text>
                    </Box>
                    <Box px="2" py="1" border="1px" borderColor="black.200" cursor="pointer"
                        borderRadius={15} 
                        onClick={accountModal.onOpen}>
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
                isOpen={accountModal.isOpen} 
                onClose={accountModal.onClose}
                logoutOfWeb3Modal={logoutOfWeb3Modal}
                address={accountAddress} />
            <UbiModal 
                isOpen={ubiModal.isOpen} 
                onClose={ubiModal.onClose}/>
        </Flex>
    );
};

export default Web3Account;