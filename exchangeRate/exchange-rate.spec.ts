import { describe, expect, it, jest, spyOn } from "bun:test";
import { getExchangeRate } from "./exchange-rate";

describe("Exchange rate module", () => {
  describe("Test getExchangeRate method", () => {
    it("Should throw an error if no exchange rate is fetched", () => {
      spyOn(global, "fetch").mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(undefined),
      } as any);

      expect(getExchangeRate()).rejects.toThrow(
        "Could not get exchange rates, please try again"
      );
    });

    it("Should return the correct data if exchange rate is fetched", async () => {
      const mockFetchReturn = {
        USDBRL: {
          code: "USD",
          codein: "BRL",
          name: "Dólar Americano/Real Brasileiro",
          high: "4.992",
          low: "4.9237",
          varBid: "0.0572",
          pctChange: "1.16",
          bid: "4.9875",
          ask: "4.989",
          timestamp: "1705942284",
          create_date: "2024-01-22 13:51:24",
        },
      };

      spyOn(global, "fetch").mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockFetchReturn),
      } as any);

      expect(await getExchangeRate()).toMatchObject({
        bid: 4.9875,
        code: "USD",
        codein: "BRL",
      });
    });
  });
});
