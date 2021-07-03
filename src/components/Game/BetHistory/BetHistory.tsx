import { Box, Flex, ResponsiveValue, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import BetHistoryRecord from "./components/BetHistoryRecord";

interface BetHistoryProps {
  height?: ResponsiveValue<number | (string & {})>
}

const BetHistory: React.FC<BetHistoryProps> = ({ height }) => {
    const bets = [1,1,1,1,1,1,1,1,1,1,1,1,1];
    return (
      <Box bg="#F6F6F6" borderRadius={8} p={5} h={height}>
        <Text>History</Text>
        <Box h="80" overflowY="scroll" mt={5}>
          <VStack spacing={5} py={2}>
            {bets.map((bet, index) => <BetHistoryRecord key={index} />)}
          </VStack>
        </Box>
      </Box>
    );
};

export default BetHistory;