import { FROM_CURRENCY, TO_CURRENCY } from "..";

export type ExchangeRate = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

export type ExchangeRateResponse = Record<typeof currencyKey, ExchangeRate>;
export const currencyKey = `${FROM_CURRENCY}${TO_CURRENCY}` as const;

export type ExchangeRateValue = {
  code: string;
  codein: string,
  bid: number;
};
