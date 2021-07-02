import { Button, useDisclosure } from "@chakra-ui/react"
import UbiModal from "../../UbiModal";

const ButtonUBI = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
      <>
        <Button mt={5} size="md" onClick={onOpen}>
          Get UBI
        </Button>

        <UbiModal 
          isOpen={isOpen} 
          onClose={onClose}/>
      </>
    );
};

export default ButtonUBI;