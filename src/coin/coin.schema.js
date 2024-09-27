import { model, Schema } from "mongoose";

const CoinSchema = new Schema({
  slug: { type: String, unique: true, required: true },
  markets: Array,
  isChecked: Boolean
}, { strict: false });

export const Coin = model('Coin', CoinSchema);
