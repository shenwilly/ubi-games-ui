import { 
  Modal, ModalContent, ModalOverlay, ModalCloseButton, ModalHeader, ModalBody, 
  Text, Button
} from "@chakra-ui/react"

interface UbiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UbiModal: React.FC<UbiModalProps> = ({ isOpen, onClose }) => {
  return (
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
                  <Text fontSize="sm">Balance</Text>
              </ModalHeader>
              <ModalCloseButton />
              {/* <ModalBody p="5">
                  <Button
                      isFullWidth={true}
                      onClick={logoutOfWeb3Modal}
                      >Disconnect</Button>
              </ModalBody> */}
          </ModalContent>
      </Modal>
  );
};

export default UbiModal;