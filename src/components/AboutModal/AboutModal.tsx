import { 
  Modal, ModalContent, ModalOverlay, ModalHeader, ModalBody, 
  Image, Button, Text, HStack, ModalCloseButton
} from "@chakra-ui/react"
import GithubLogo from "../../assets/github.png";
import PolygonLogo from "../../assets/polygon.png";
import { UBIGAMES_GITHUB_URL, UBIROLL_POLYGONSCAN_URL } from "../../constants";
import { openNewTab } from "../../utils/helpers";

interface NetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<NetworkModalProps> = ({ isOpen, onClose }) => {
  return (
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader />
              <ModalCloseButton />
              <ModalBody p="5">
                <Text textAlign="center">
                  Ubiroll is a dice roll game where players can choose their own winning chance
                </Text>
                <Text textAlign="center">
                  · Half of profits will be used to burn UBI 🔥🔥🔥
                </Text>
                <Text textAlign="center">
                  · Results are fairly generated via Chainlink VRF
                </Text>
                <HStack spacing={3} alignItems="center" justify="center" mt={5}>
                  <Button onClick={() => openNewTab(UBIROLL_POLYGONSCAN_URL)} 
                      p="2" size="md" variant="ghost"
                  >
                      <Image src={PolygonLogo} fit="contain" width="24px" />
                  </Button>
                  <Button onClick={() => openNewTab(UBIGAMES_GITHUB_URL)} 
                      p="2" size="md" variant="ghost"
                  >
                      <Image src={GithubLogo} fit="contain" width="24px" />
                  </Button>
                </HStack>
              </ModalBody>
          </ModalContent>
      </Modal>
  );
};

export default AboutModal;