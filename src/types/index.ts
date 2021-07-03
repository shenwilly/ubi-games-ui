export enum BetValidStatus {
  WEB3_NOT_EXIST,
  AMOUNT_ZERO,
  AMOUNT_TOO_SMALL,
  BALANCE_NOT_ENOUGH,
  ALLOWANCE_NOT_ENOUGH,
  PAYOUT_TOO_BIG,
  VALID
}

export interface ETHEREUM_CHAIN {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}
