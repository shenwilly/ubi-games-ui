import { Button, Container, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react"
import styled from "styled-components";
import { useCustomHook } from "../../hooks/useCustomHook";

const Home = () => {
    const { randomNumber, generateRandomNumber } = useCustomHook();
    return (
        <>
            <SimpleGrid column="2">
                {randomNumber}
                <Button onClick={generateRandomNumber}>Update</Button>
            </SimpleGrid>
        </>
    );
};

export default Home;