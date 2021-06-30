import { 
  Modal, ModalContent, ModalOverlay, ModalCloseButton, ModalHeader, ModalBody, 
  Text, Button
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
                  <Text fontSize="sm">{address}</Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody p="5">
                  <Button
                      isFullWidth={true}
                      onClick={logoutOfWeb3Modal}
                      >Disconnect</Button>
              </ModalBody>
          </ModalContent>
      </Modal>
  );
};

export default Web3AccountModal;