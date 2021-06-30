import { Button, Text, Flex, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, SimpleGrid, Box, GridItem, Grid } from "@chakra-ui/react"
import { useState } from "react";
import styled from "styled-components";
import PageLayout from "../../components/PageLayout";

const Game = () => {
    const houseBalance = 10000;
    const maxPayout = houseBalance/100;
    const minBet = "5";
    const [betAmount, setBetAmount] = useState(minBet);
    const [betChance, setBetChance] = useState(50);
    const houseEdge = 1;

    const payout = () => {
      if (!betAmount || !betChance || !houseEdge) return "-";

      return (parseInt(betAmount) * (100-houseEdge)) / betChance;
    }

    const canCreateBet = () => {
      if (payout() > maxPayout) return false;
      return true;
    }
  
    return (
      <PageLayout>
        <SimpleGrid columns={2} columnGap={8}>
          <Flex direction="column">
              <Text mt={5}>House Balance: {houseBalance} UBI</Text>
              <Text mt={2}>Max payout: {maxPayout} UBI</Text>

              <Text mt={5}>Bet Amount:</Text>
              <Input mt={2} 
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}/>

              <Text mt={5}>Chance</Text>

              <Grid templateColumns="repeat(12, 1fr)" columnGap={4} mt={2}>
                <GridItem colSpan={10} px={3}>
                  <Slider aria-label="slider-ex-1"
                    value={betChance}
                    min={1} max={(99-houseEdge)}
                    height="100%"
                    onChange={(value) => setBetChance(value)}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text>
                    {betChance}%
                  </Text>
                </GridItem>
              </Grid>

              <Text mt={5}>Payout: {payout()} UBI</Text>

              <Button mt={5} size="lg">
                Place Bet
              </Button>
          </Flex>
          <Box bg="#F6F6F6" borderRadius={8}>
          </Box>
        </SimpleGrid>
        <Box width="100%" height="100px"  bg="#F6F6F6" borderRadius={8} mt={5} p={5}>
          History
        </Box>
      </PageLayout>
    );
};

export default Game;