import { 
  Modal, ModalContent, ModalOverlay, ModalCloseButton, ModalHeader, ModalBody, 
  Text, Button, Heading, VStack
} from "@chakra-ui/react"
import useUbiroll from "../../hooks/useUbiroll";
import { formatBN } from "../../utils/bigNumber";

interface UbiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UbiModal: React.FC<UbiModalProps> = ({ isOpen, onClose }) => {
  const { ubiBalance } = useUbiroll();

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
                  <Text fontSize="sm">Your UBI Balance</Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody p="5">
                <VStack spacing={5}>
                    <Heading>{formatBN(ubiBalance, 2)} UBI</Heading>

                    <Button isFullWidth>
                      Buy on Quickswap
                    </Button>

                    <Button isFullWidth>
                      Bridge from Ethereum
                    </Button>
                </VStack>
              </ModalBody>
          </ModalContent>
      </Modal>
  );
};

export default UbiModal;