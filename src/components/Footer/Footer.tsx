import { Container, Flex, Button, Image } from "@chakra-ui/react"
import GithubLogo from "../../assets/github.png";
import PolygonLogo from "../../assets/polygon.png";
import { UBIGAMES_GITHUB_URL, UBIROLL_POLYGONSCAN_URL } from "../../constants";
import { openNewTab } from "../../utils/helpers";

const Footer = () => {

    return (
        <Container maxW="container.xl">
          <Flex align="center" pr="1">
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
          </Flex>
        </Container>
    );
};

export default Footer;