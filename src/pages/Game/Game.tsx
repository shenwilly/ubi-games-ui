import { Text, Flex, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, SimpleGrid, Box, GridItem, Grid, Center } from "@chakra-ui/react"
import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useMemo, useState } from "react";
import BetHistory from "../../components/Game/BetHistory";
import ButtonBet from "../../components/Game/ButtonBet";
import ButtonUBI from "../../components/Game/ButtonUBI";
import PageLayout from "../../components/PageLayout";
import useUbiroll from "../../hooks/useUbiroll";
import useWeb3 from "../../hooks/useWeb3";
import { BetValidStatus } from "../../types";
import { formatBN } from "../../utils/bigNumber";

const Game = () => {
    const { injectedProvider, loadWeb3Modal } = useWeb3();
    const { createBet, ubiBalance, houseUbiBalance, minBet, allowance, onApprove } = useUbiroll();
    const [betAmount, setBetAmount] = useState(formatBN(minBet));
    const [betChance, setBetChance] = useState(50);
    const houseEdge = 1;

    const maxPayout = useMemo(() => {
      return houseUbiBalance.div(100);
    }, [houseUbiBalance]);

    const betAmountBN = useMemo(() => {
      if (betAmount.length === 0) return BigNumber.from(0);
      return parseUnits(betAmount, 18);
    }, [betAmount]);

    const payout = useMemo(() => {
      if (betAmount.length === 0 || !betChance || !houseEdge) return BigNumber.from(0);

      const betAmountBN = parseUnits(betAmount, 18);
      return (betAmountBN.mul(100-houseEdge)).div(betChance);
    }, [betAmount, betChance, houseEdge]);

    const validStatus = useMemo((): BetValidStatus => {
      if (!injectedProvider) {
        return BetValidStatus.WEB3_NOT_EXIST;
      }

      if (betAmountBN.lte(0)) {
        return BetValidStatus.AMOUNT_ZERO;
      }
      
      if (betAmountBN.lt(minBet)) {
        return BetValidStatus.AMOUNT_TOO_SMALL;
      }

      if (ubiBalance.lt(betAmountBN)) {
        return BetValidStatus.BALANCE_NOT_ENOUGH;
      }
      
      if (payout.gt(maxPayout)) {
        return BetValidStatus.PAYOUT_TOO_BIG
      }
      
      if (allowance.lt(betAmountBN)) {
        return BetValidStatus.ALLOWANCE_NOT_ENOUGH;
      }

      return BetValidStatus.VALID;
    }, [payout, maxPayout, ubiBalance, allowance, betAmountBN, minBet, injectedProvider]);

    const bet = async () => {
      await createBet(parseUnits(betAmount, 18), betChance);
    }

    return (
      <PageLayout height={["", "100%"]}>
        <SimpleGrid columns={[1, 2]} columnGap={8} height="100%">
          <Flex direction="column">
              {/* <Text mt={5}>House Balance: {formatBN(houseUbiBalance, 4)} UBI</Text> */}
              <Text mt={2}>Minimum bet: {formatBN(minBet)} UBI</Text>

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
              <Text mt={2}>Max payout: {formatBN(maxPayout, 4)} UBI</Text>

              <Center mt={5}>
                <ButtonBet 
                  validationStatus={validStatus}
                  onApprove={onApprove}
                  onBet={bet}
                  onConnect={loadWeb3Modal}/>
              </Center>
              {ubiBalance.lte(0) &&
                (<Center>
                  <ButtonUBI />
                </Center>)
              }
          </Flex>
          <Box mt={[8, 0]}>
            <BetHistory height={["", "80vh"]}/>
          </Box>
        </SimpleGrid>
      </PageLayout>
    );
};

export default Game;