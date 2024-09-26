import { config } from "../config/index.js";
import got from "got";

export async function fetchAllCoins() {
  const url = config.baseMapUrl;
  const response = await got.get(url, {
    headers: {
      'X-CMC_PRO_API_KEY': config.coinMarketCapKey
    }
  });
  return JSON.parse(response.body);
}

export async function fetchMarketData(slug) {
  const url = config.baseCoinUrl(slug);
  const response = await got.get(url);
  return JSON.parse(response.body);
}
