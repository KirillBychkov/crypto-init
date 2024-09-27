import { Coin } from "./coin.schema.js";

export class CoinService {
  constructor() {}

  async initialSave(coinsData) {
    try {
      await Coin.insertMany(coinsData);
      console.log('Initial coins ' + coinsData.length + ' saved to MongoDB');
    } catch (error) {
      console.error('Error saving coins data to MongoDB:', error.message);
    }
  }

  async saveCoinsData(coinData, slug) {
    try {
      await Coin.findOneAndUpdate(
        { slug },
        { markets: coinData, isChecked: !!coinData.length },
        { upsert: true, new: true }
      );
    } catch (error) {
      console.error('Error saving ' + slug + ' data to MongoDB:', error);
    }
  }

  async getCoinsData({ slugList, isChecked }) {
    const result = await Coin.find({
      $or: [...slugList],
      isChecked
    });
    return this.convertCoinsToData(result);
  }

  convertCoinsToData = (coins) => {
    return coins.reduce((acc, coin) => {
      acc[coin.slug] = {
        ...coin._doc,
        markets: coin.markets
      };
      return acc;
    }, {});
  };
}

export const coinService = new CoinService();
