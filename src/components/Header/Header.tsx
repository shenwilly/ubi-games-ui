import { Container, Flex, Spacer, Text, Button, useColorMode } from "@chakra-ui/react"
import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <StyledHeader maxW="container.xl">
            <StyledRow align="center">
                <Text textStyle="appTitle">AppName</Text>
                <Spacer />
                <Button onClick={toggleColorMode} p="2" size="md" variant="ghost">
                    {colorMode === "light" 
                        ? <FaSun />
                        : <FaMoon />}
                </Button>
            </StyledRow>
        </StyledHeader>
    );
};

const StyledHeader = styled(Container)`
    background-color: lightgrey;
`
const StyledRow = styled(Flex)`
    height: ${props => props.theme.headerHeight};
`

export default Header;