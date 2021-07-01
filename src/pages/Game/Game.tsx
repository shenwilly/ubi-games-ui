import { Button, Text, Flex, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, SimpleGrid, Box, GridItem, Grid } from "@chakra-ui/react"
import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { useMemo, useState } from "react";
import styled from "styled-components";
import PageLayout from "../../components/PageLayout";
import useUbiroll from "../../hooks/useUbiroll";

const Game = () => {
    const { createBet, ubiBalance, houseUbiBalance } = useUbiroll();
    const minBet = "5";
    const [betAmount, setBetAmount] = useState(minBet);
    const [betChance, setBetChance] = useState(50);
    const [validationMsg, setValidationMsg] = useState("");
    const houseEdge = 1;

    const maxPayout = useMemo(() => {
      return houseUbiBalance.div(100);
    }, [houseUbiBalance]);

    const payout = useMemo(() => {
      if (betAmount.length === 0 || !betChance || !houseEdge) return BigNumber.from(0);

      const betAmountBN = parseUnits(betAmount, 18);
      return (betAmountBN.mul(100-houseEdge)).div(betChance);
    }, [betAmount, betChance, houseEdge]);

    const canCreateBet = useMemo(() => {
      if (betAmount.length === 0 || parseUnits(betAmount, 18).lte(0)) {
        setValidationMsg("Input bet amount");
        return false;
      }
      
      if (ubiBalance.lt(parseUnits(betAmount, 18))) {
        setValidationMsg("Not enough UBI");
        return false;
      }
      
      if (payout.gt(maxPayout)) {
        setValidationMsg("Payout too large");
        return false;
      }
      
      return true;
    }, [payout, maxPayout, ubiBalance]);

    const bet = async () => {
      console.log(betAmount, betChance)
      const result = await createBet(parseUnits(betAmount, 18), betChance);
      console.log("BET:", result);
    }

    const formatBN = (number: BigNumber, decimals: number = 2) => {
      return parseFloat(formatUnits(number, 18)).toFixed(decimals);
    }
  
    return (
      <PageLayout>
        <SimpleGrid columns={[1, 2]} columnGap={8}>
          <Flex direction="column">
              <Text mt={5}>House Balance: {formatBN(houseUbiBalance, 4)} UBI</Text>
              <Text mt={2}>Max payout: {formatBN(maxPayout, 4)} UBI</Text>

              <Text mt={5}>Bet Amount:</Text>
              <Input mt={2} 
                value={betAmount}
                min={0}
                type={'number'}
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

              <Text mt={5}>Payout: {formatBN(payout, 3)} UBI</Text>

              {canCreateBet 
                ? (<Button mt={5} size="lg" onClick={bet}>
                    Place Bet
                  </Button>)
                : (<Button mt={5} size="lg" disabled>
                    {validationMsg}
                  </Button>)
              }
          </Flex>
          <Box bg="#F6F6F6" borderRadius={8} p={5} mt={[8, 0]}>
            History
          </Box>
        </SimpleGrid>
      </PageLayout>
    );
};

export default Game;