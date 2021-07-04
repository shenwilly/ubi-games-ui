import { Container, Flex, Button, useDisclosure } from "@chakra-ui/react"
import { BsQuestionCircle } from  "react-icons/bs";
import AboutModal from "../AboutModal";

const Footer = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    
    return (
        <Container maxW="container.xl">
          <Flex align="center">
            <Button onClick={onOpen} 
                p="2" size="md" variant="ghost"
            >
                <BsQuestionCircle size="30px" />
            </Button>
          </Flex>
          <AboutModal isOpen={isOpen} onClose={onClose}/>
        </Container>
    );
};

export default Footer;