import { Container, Flex, Spacer, Text } from "@chakra-ui/react"
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Web3Account from "../Web3Account";

const Header = () => {
    const history = useHistory()
    
    return (
        <Container maxW="container.xl">
            <StyledRow align="center">
                <Text cursor="pointer" textStyle="appTitle" onClick={() => history.push('/')}>UBIroll</Text>
                <Spacer />
                <Web3Account />
            </StyledRow>
        </Container>
    );
};

const StyledRow = styled(Flex)`
    height: ${props => props.theme.headerHeight};
`

// const NavMenu: React.FC<{ onClick?: MouseEventHandler }> = ({ onClick, children }) => {
//     return (
//       <Text px="3" mx="3" cursor="pointer" textAlign="center" onClick={onClick}>
//         {children}
//       </Text>
//     )
// }

export default Header;