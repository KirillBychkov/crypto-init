import { connect} from "./db/connections.js";
import { fetchAllCoins, fetchMarketData } from "./utils/cmc.js";
import { config } from "./config/index.js";
import { coinService } from "./coin/coin.service.js";

export async function MainJob () {
  console.log("Running daily update...");
  await connect();
  const allCoins = await fetchAllCoins();

  // Filter based on selected coins
  const filteredCoins = allCoins.data.filter((coin) =>
    config.selectedCoins.includes(coin.slug));

  // Fetch market data in parallel
  const marketDataPromises = filteredCoins.map((coin) =>
    fetchMarketData(coin.slug));

  const marketDataResults = await Promise.all(marketDataPromises);

  // Process market data and filter markets based on exchanges, volume, and trading pairs
  const monitoredList = {};

  filteredCoins.forEach((coin, index) => {
    const marketData = marketDataResults[index];
    monitoredList[coin.slug] = marketData.data.marketPairs
      .map((market) => ({
        ...market,
        exchangeName: market.exchangeName.toLowerCase()
      }))
      .filter((market) =>
        config.selectedExchanges.includes(market.exchangeName)
        && market.volumeUsd > config.minVolume
        && config.selectedGroups.includes(market.quoteSymbol)
      );
  });

  // Save the data to MongoDB
  const data = await coinService.saveCoinsData(monitoredList);
}
