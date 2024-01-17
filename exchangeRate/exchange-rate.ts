import { FROM_CURRENCY, TO_CURRENCY } from "..";
import {
  ExchangeRateResponse,
  ExchangeRateValue,
} from "./exchange-rates.entities";

export const getExchangeRate = async (): Promise<ExchangeRateValue> => {
  const currencyKey = `${FROM_CURRENCY}${TO_CURRENCY}` as const;
  const exchangeRateRes = await fetch(
    `https://economia.awesomeapi.com.br/json/last/${FROM_CURRENCY}-${TO_CURRENCY}`
  );

  const exchangeRate = (await exchangeRateRes.json()) as ExchangeRateResponse;

  if (!exchangeRate || !exchangeRate?.[currencyKey]) {
    throw new Error("Could not get exchange rates, please try again");
  }

  const exchangeRateValue: ExchangeRateValue = {
    code: exchangeRate?.[currencyKey].code,
    codein: exchangeRate?.[currencyKey].codein,
    bid: parseFloat(exchangeRate?.[currencyKey].bid),
  };

  return exchangeRateValue;
};
