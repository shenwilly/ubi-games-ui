import { Box, Flex, ResponsiveValue, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import useUbiroll from "../../../hooks/useUbiroll";
import BetHistoryRecord from "./components/BetHistoryRecord";

interface BetHistoryProps {
  height?: ResponsiveValue<number | (string & {})>
}

const BetHistory: React.FC<BetHistoryProps> = ({ height }) => {
    const { bets } = useUbiroll();

    return (
      <Box bg="#F6F6F6" borderRadius={8} p={5} h={height}>
        <Text>History</Text>
        <Box h="80" overflowY="scroll" mt={5}>
          <VStack spacing={5} py={2}>
            {bets && bets.length > 0 &&
              bets.map((bet, index) => <BetHistoryRecord key={index} bet={bet} />)}
            {bets && bets.length == 0 &&
              <Text>No bets yet</Text>}
            {!bets && <Text>Loading</Text>}
          </VStack>
        </Box>
      </Box>
    );
};

export default BetHistory;