export interface NETWORK {
  name: string,
  nativeCurrency: string,
  ubi: string,
}

export enum BetValidStatus {
  WEB3_NOT_EXIST,
  AMOUNT_ZERO,
  AMOUNT_TOO_SMALL,
  BALANCE_NOT_ENOUGH,
  ALLOWANCE_NOT_ENOUGH,
  PAYOUT_TOO_BIG,
  VALID
}