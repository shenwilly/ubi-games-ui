import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Text, Button, VStack, Center
} from "@chakra-ui/react"
import { NETWORKS } from "../../constants";
import useWeb3 from "../../hooks/useWeb3";

interface NetworkModalProps {
  isOpen: boolean;
}

const NetworkModal: React.FC<NetworkModalProps> = ({ isOpen }) => {
  const { changeNetwork } = useWeb3();
  const handleClick = async () => {
    changeNetwork(NETWORKS.MATIC);
  }

  return (
      <Modal isOpen={isOpen} onClose={() => {}}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
                  <Text fontSize="sm">Network not supported</Text>
              </ModalHeader>
              <ModalBody p="5">
                <VStack spacing={5}>
                  <Center>
                    <Text fontWeight="bold" width="100%">
                      Please switch to Polygon  
                    </Text>
                  </Center>
                  <Button
                      isFullWidth={true}
                      onClick={handleClick}
                      >Switch Network</Button>
                </VStack>
              </ModalBody>
          </ModalContent>
      </Modal>
  );
};

export default NetworkModal;