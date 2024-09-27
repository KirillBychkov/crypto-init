import express, { json } from "express";
import { controller } from "./controller/app.controller.js";
import { syncEveryCoin } from "./job.js";
import { connect } from "./db/connections.js";
import { fetchAllCoins } from "./utils/cmc.js";
import { coinService } from "./coin/coin.service.js";
import { Coin } from "./coin/coin.schema.js";

let status = { process: false, max: 0, current: 0, interval: null  };
const operation = async () => {
  status.process = true;
  await Coin.collection.drop();
  const allCoins = (await fetchAllCoins()).slice(0, 10);
  // const allCoins = await fetchAllCoins();
  const coinsData = allCoins.map((e) => ({ ...e, markets: [], isChecked: false } ));
  await coinService.initialSave(coinsData);

  status.interval = setInterval(() => syncEveryCoin(allCoins, status), 500);
};

// Server
const app = express();
app.use(json());
app.get('/coins', controller.getAllCoins.bind(controller));
app.get('/slugs', controller.getAllSlugs.bind(controller));
app.post('/refresh', (req, res) => {
  if(!status.process) operation().then(() => {});

  res.status(200).json({
    message: status.process?
        "Operation already processing on " + status.current + " iteration" : "Operation successfully started"
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await connect();
  console.log(`Server running at http://localhost:${port}`);
  await operation();
});
