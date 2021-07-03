import { Button } from "@chakra-ui/react"
import { useCallback, useMemo } from "react";
import { BetValidStatus } from "../../../types";

interface ButtonBetProps {
  validationStatus: BetValidStatus,
  onApprove: () => void,
  onBet: () => void,
  onConnect: () => void,
}

const ButtonBetLabelMap: Map<BetValidStatus, string> = new Map([
  [BetValidStatus.WEB3_NOT_EXIST, "CONNECT WALLET"],
  [BetValidStatus.AMOUNT_ZERO, "INPUT BET AMOUNT"],
  [BetValidStatus.AMOUNT_TOO_SMALL, "BET TOO SMALL"],
  [BetValidStatus.BALANCE_NOT_ENOUGH, "NOT ENOUGH UBI"],
  [BetValidStatus.ALLOWANCE_NOT_ENOUGH, "APPROVE"],
  [BetValidStatus.PAYOUT_TOO_BIG, "PAYOUT TOO BIG"],
  [BetValidStatus.VALID, "PLACE BET"],
])

const ButtonBet: React.FC<ButtonBetProps> = ({ validationStatus, onApprove, onBet, onConnect }) => {

    const label = useMemo(() => {
      return ButtonBetLabelMap.get(validationStatus);
    }, [validationStatus])

    const handleClick = useCallback(() => {
      if (validationStatus === BetValidStatus.WEB3_NOT_EXIST) {
        onConnect();
      } else if (validationStatus === BetValidStatus.ALLOWANCE_NOT_ENOUGH) {
        onApprove();
      } else if (validationStatus === BetValidStatus.VALID) {
        onBet();
      }
    }, [validationStatus, onConnect, onApprove, onBet])

    const disabled = useMemo(() => {
      return (
        validationStatus !== BetValidStatus.WEB3_NOT_EXIST
        && validationStatus !== BetValidStatus.ALLOWANCE_NOT_ENOUGH
        && validationStatus !== BetValidStatus.VALID)
    }, [validationStatus])

    return (
      <>
        <Button size="lg" onClick={handleClick} disabled={disabled} isFullWidth>
          {label}
        </Button>
      </>
    );
};

export default ButtonBet;