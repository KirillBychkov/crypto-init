import { model, Schema } from "mongoose";

const CoinSchema = new Schema({
  slug: String,
  markets: Array,
  isChecked: Boolean
}, { strict: false });

export const Coin = model('Coin', CoinSchema);
