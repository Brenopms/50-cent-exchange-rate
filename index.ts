import { getExchangeRate } from "./exchangeRate/exchange-rate";

export const FROM_CURRENCY = "USD" as const;
export const TO_CURRENCY = "BRL" as const;

const exchangeRate = await getExchangeRate();
console.log(exchangeRate);
