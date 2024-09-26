import { coinService } from "../coin/coin.service.js";

export class AppController {
  constructor() {}

  getAllCoins = async (req, res) => {
    console.log('Fetching coin data from db');
    const result = await coinService.getCoinsData();
    return res.status(200).json(result);
  }
}

export const controller = new AppController();
