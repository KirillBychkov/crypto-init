import { config as dotenvCfg } from "dotenv";
dotenvCfg();

export const config = {
  coinMarketCapKey: process.env.COINMARKETCAPKEY,
  baseMapUrl: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?listing_status=active&start=1&limit=5000&sort=cmc_rank",
  baseCoinUrl: (slug) => `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/market-pairs/latest?slug=${slug}&category=spot`
};
