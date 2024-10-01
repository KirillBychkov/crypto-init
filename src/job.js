import { fetchMarketData } from "./utils/cmc.js";
import { coinService } from "./coin/coin.service.js";

export async function syncEveryCoin(allCoins, status) {
  status.max = allCoins.length;
  const coin = allCoins[status.current];
  if(coin) {
    const marketData = await fetchMarketData(coin.slug);
    const data = marketData.data.marketPairs.map(({
      baseCurrencyId,
      baseSymbol,
      category,
      centerType,
      exchangeId,
      exchangeName,
      exchangeSlug,
      lastUpdated,
      marketPair,
      marketUrl,
      quoteSymbol,
      marketReputation,
      type
    }) => ({
      baseCurrencyId,
      baseSymbol,
      category,
      centerType,
      exchangeId,
      exchangeName,
      exchangeSlug,
      lastUpdated,
      marketPair,
      marketUrl,
      quoteSymbol,
      marketReputation,
      type
    }));
    await coinService.saveCoinsData(data, coin.slug);

    console.log(coin)
    console.log(data.length)
    console.log(status.current + ') ' + coin.slug + ' data processed. List length ' + status.max);
  }

  if(status.max > status.current) {
    status.current = status.current + 1;
  } else {
    status.process = false;
    status.current = 0;
    clearInterval(status.interval);
  }
}
