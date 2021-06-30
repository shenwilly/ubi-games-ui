import { Button, Text, Flex, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, SimpleGrid, Box } from "@chakra-ui/react"
import styled from "styled-components";
import PageLayout from "../../components/PageLayout";

const Game = () => {
  
    return (
      <PageLayout>
        <SimpleGrid columns={2} columnGap={8}>
          <Flex direction="column">
              <Text mt={5}>House Balance: 10.000 UBI</Text>
              <Text mt={2}>Max payout: 100 UBI</Text>

              <Text mt={5}>Amount</Text>
              <Input mt={2}/>

              <Text mt={5}>Chance</Text>

              <Flex>
                <Slider aria-label="slider-ex-1" mt={2} 
                  defaultValue={30}
                  min={0} max={98}>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Input/>
              </Flex>

              <Text mt={5}>Payout: 1.000 UBI</Text>

              <Button mt={5}>
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