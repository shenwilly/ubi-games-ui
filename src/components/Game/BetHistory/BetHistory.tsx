import { Box, ResponsiveValue, Text, VStack } from "@chakra-ui/react";
import useUbiroll from "../../../hooks/useUbiroll";
import BetHistoryRecord from "./components/BetHistoryRecord";

interface BetHistoryProps {
  height?: ResponsiveValue<number | (string & {})>
}

const BetHistory: React.FC<BetHistoryProps> = ({ height }) => {
    const { pendingBets, bets } = useUbiroll();

    return (
      <Box bg="#F6F6F6" borderRadius={8} p={5} h={height}>
        <Text>History</Text>
        <Box h="90%" overflowY="scroll" mt={5}>
          <VStack spacing={5} py={2}>
            {pendingBets && pendingBets.length > 0 &&
              pendingBets.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
                .map((bet, index) => <BetHistoryRecord key={index} bet={bet} />)}
            {bets && bets.length > 0 &&
              bets.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
                .map((bet, index) => <BetHistoryRecord key={index} bet={bet} />)}
            {bets && bets.length == 0 &&
              <Text>No bets yet</Text>}
            {!bets && <Text>Loading</Text>}
          </VStack>
        </Box>
      </Box>
    );
};

export default BetHistory;