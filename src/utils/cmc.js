import { config } from "../config/index.js";
import got from "got";

export async function fetchAllCoins() {
  const url = config.baseMapUrl;
  const response = await got.get(url, {
    headers: {
      'X-CMC_PRO_API_KEY': config.coinMarketCapKey
    }
  });
  const data = JSON.parse(response.body);
  return data.data;
}

export async function fetchMarketData(slug) {
  const url = config.baseCoinUrl(slug);
  const response = await got.get(url);
  // console.log('response', response.statusCode)
  return JSON.parse(response.body);
}
