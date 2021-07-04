import { Box, Text, Flex, Spacer } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { Bet } from "../../../../../types";
import { formatBN } from "../../../../../utils/bigNumber";
import { format, fromUnixTime } from 'date-fns'
import { useMemo } from "react";

interface BetHistoryRecordProps {
  bet: Bet
}

const BetHistoryRecord: React.FC<BetHistoryRecordProps> = ({ bet }) => {
  const { amount, chance, prize, timestamp, finished, win } = bet;
  const betAmount = useMemo(() => formatBN(BigNumber.from(amount)), [amount]);
  const prizeAmount = useMemo(() => formatBN(BigNumber.from(prize), 4), [prize]);
  const date = useMemo(() => fromUnixTime(parseInt(timestamp)), [timestamp]);
  const dateLabel = useMemo(() => format(date, 'Pp'), [date]);

  return (
    <Box borderRadius={8} p={3} bg="white" border="1px" borderColor="gray.300" width="100%">
      <Flex>
        <Text>Bet: {betAmount} UBI</Text>
        <Spacer/>
        <Text fontWeight="bold">
          {finished 
            ? win
              ? 'WIN'
              : 'LOSE'
            : 'PENDING'
          }
        </Text>
      </Flex>
      <Flex>
        <Text>Chance: {chance}%</Text>
      </Flex>
      <Flex alignItems="flex-end">
        <Text>Payout: {prizeAmount} UBI</Text>
        <Spacer/>
        <Text fontSize="sm">{dateLabel}</Text>
      </Flex>
    </Box>
  );
};

export default BetHistoryRecord;