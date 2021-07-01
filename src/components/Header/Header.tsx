import { Box, Container, Flex, Heading, Spacer, Text, useColorMode } from "@chakra-ui/react"
import { MouseEventHandler } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Web3Account from "../Web3Account";
// import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
    const history = useHistory()
    // const { colorMode, toggleColorMode } = useColorMode()

    return (
        <StyledHeader maxW="container.xl">
            <StyledRow align="center">
                <Text cursor="pointer" textStyle="appTitle" onClick={() => history.push('/')}>UBIroll</Text>
                {/* <NavMenu onClick={() => history.push('/game')}>
                    Play
                </NavMenu> */}
                <Spacer />
                <Web3Account />
                {/* <Button onClick={toggleColorMode} p="2" size="md" variant="ghost">
                    {colorMode === "light" 
                        ? <FaSun />
                        : <FaMoon />}
                </Button> */}
            </StyledRow>
        </StyledHeader>
    );
};

const StyledHeader = styled(Container)`
    // background-color: lightgrey;
`

const StyledRow = styled(Flex)`
    height: ${props => props.theme.headerHeight};
`

const NavMenu: React.FC<{ onClick?: MouseEventHandler }> = ({ onClick, children }) => {
    return (
      <Text px="3" mx="3" cursor="pointer" textAlign="center" onClick={onClick}>
        {children}
      </Text>
    )
}

export default Header;