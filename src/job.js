import { fetchMarketData } from "./utils/cmc.js";
import { coinService } from "./coin/coin.service.js";

export async function syncEveryCoin(allCoins, status) {
  status.max = allCoins.length;
  const coin = allCoins[status.current];
  if(coin) {
    const marketData = await fetchMarketData(coin.slug);
    await coinService.saveCoinsData(marketData.data.marketPairs, coin.slug);
  }

  if(status.max > status.current) {
    status.current = status.current + 1;
  } else {
    status.process = false;
    status.current = 0;
    clearInterval(status.interval);
  }
}
