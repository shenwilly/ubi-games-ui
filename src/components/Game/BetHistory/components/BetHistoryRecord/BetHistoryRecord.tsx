import { Box, Text, Flex, Spacer } from "@chakra-ui/react";
import { Bet } from "../../../../../types";

interface BetHistoryRecordProps {
  bet: Bet
}

const BetHistoryRecord: React.FC<BetHistoryRecordProps> = ({ bet }) => {
  return (
    <Box borderRadius={8} p={3} bg="white" border="1px" borderColor="gray.300" width="100%">
      <Flex>
        <Text>0.1 UBI @ 50%</Text>
        <Spacer/>
        <Text fontWeight="bold">Pending</Text>
      </Flex>
      <Flex alignItems="flex-end">
        <Text>Payout: 0.1 UBI</Text>
        <Spacer/>
        <Text fontSize="sm">{bet.timestamp}</Text>
      </Flex>
    </Box>
  );
};

export default BetHistoryRecord;