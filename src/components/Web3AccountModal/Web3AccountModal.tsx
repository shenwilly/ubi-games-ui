import { 
  Modal, ModalContent, ModalOverlay, ModalCloseButton, ModalHeader, ModalBody, 
  Text, Button, VStack, Center
} from "@chakra-ui/react"

interface Web3AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  logoutOfWeb3Modal: () => void;
  address: string;
}

const Web3AccountModal: React.FC<Web3AccountModalProps> = ({ isOpen, onClose, logoutOfWeb3Modal, address }) => {
  return (
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
                  <Text fontSize="sm">Connected Account</Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody p="5">
                <VStack spacing={5}>
                  <Center>
                    <Text fontWeight="bold" width="100%" fontSize="sm">{address}</Text>
                  </Center>
                  <Button
                      isFullWidth={true}
                      onClick={logoutOfWeb3Modal}
                      >Disconnect</Button>
                </VStack>
              </ModalBody>
          </ModalContent>
      </Modal>
  );
};

export default Web3AccountModal;