import { coinService } from "../coin/coin.service.js";
import { Coin } from "../coin/coin.schema.js";
import { getQuery } from "../utils/pagin.js";

export class AppController {
  constructor() {}

  async getAllSlugs(req, res) {
    const { query, pagination } = getQuery(req.query)
    let sort = [];

    if(req.query.sorted)
      sort = req.query.sorted.split(':')

    const total = await Coin.countDocuments(query).exec()
    let coins = Coin.find(query, { fullText: 0 }, pagination);

    if(!!req.query.sorted && typeof sort[0] === 'string' && typeof +sort[1] === 'number') {
      coins.sort({ [sort[0]]: +sort[1] });
      pagination.sorted = { [sort[0]]: +sort[1] };
    } else if(req.query.sorted) {
      return res.status(400).send({ error: 'Sorting parameters must be like this fieldName:1 or fieldName:-1' });
    }

    coins = await coins.exec();
    coins = coins.map(({ slug, rank, symbol }) => ({ slug, rank, symbol }));
    res.status(200).json({ pagination: { ...pagination, total }, data: coins })
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
