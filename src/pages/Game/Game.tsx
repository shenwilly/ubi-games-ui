import { Button, Container, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react"
import styled from "styled-components";
import { useCustomHook } from "../../hooks/useCustomHook";

const Game = () => {
    const { randomNumber, generateRandomNumber } = useCustomHook();
    return (
      <>
        <Flex dir="column">
            Game
        </Flex>
      </>
    );
};

export default Game;