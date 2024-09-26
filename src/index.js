import cron from "cron";
import express, { json } from "express";
import { controller } from "./controller/app.controller.js";
import { MainJob } from "./job.js";
import { connect } from "./db/connections.js";

// Server
const app = express();
app.use(json());
app.get('/all', controller.getAllCoins.bind(controller));

// Start the server
const port = process.env.PORT;
app.listen(port, async () => {
  await connect();
  console.log(`Server running at http://localhost:${port}`);

  await MainJob();
  const dailyUpdateJob = new cron.CronJob('0 0 * * *', MainJob);
  dailyUpdateJob.start();
});