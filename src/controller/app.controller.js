import { coinService } from "../coin/coin.service.js";

export class AppController {
  constructor() {}

  getAllSlugs = async (req, res) => {
    const result = await coinService.getSlugsData();
    return res.status(200).json(result);
  }

  getAllCoins = async (req, res) => {
    console.log('Fetching coin data from db', req.query);
    const { slugs, isChecked } = req.query;
    if(!slugs)
      return res.status(400).json({ message: "Please specify coins in 'slugs' key" });

    const slugList = slugs.split(',').map(slug => ({ slug }));
    const result = await coinService.getCoinsData({ slugList, isChecked: isChecked || true });
    return res.status(200).json(result);
  }
}

export const controller = new AppController();
