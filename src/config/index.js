import { config as dotenvCfg } from "dotenv";
dotenvCfg();

export const config = {
  selectedCoins: [
    "altlayer", "mask-network", "open-campus", "zetachain", "blast",
    "illuvium", "biconomy", "arkham", "gmx", "space-id", "meme",
    "basic-attention-token", "celo", "green-metaverse-token"
  ],
  selectedExchanges: [
    "binance", "bybit", "bingx", "bitget", "gateio", "kucoin", "kraken",
    "bitrue", "cryptocom", "okx", "poloniex", "upbit", "kuna", "mexc",
    "whitebit"
  ],
  selectedGroups: ["USDT", "USDC", "FDUSD"],
  minVolume: 10000,
  minPercentage: 1,
  coinMarketCapKey: process.env.COINMARKETCAPKEY,
  baseMapUrl: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?listing_status=active&start=1&limit=5000&sort=cmc_rank",
  baseCoinUrl: (slug) => `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/market-pairs/latest?slug=${slug}&category=spot`
};
