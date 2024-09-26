import { model, Schema } from 'mongoose';

// todo: schema validation
const CoinSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  markets: [{
    marketPair: { type: String, required: true },
    exchangeName: { type: String, required: true },
    volumeUsd: { type: Number, required: true },
    quoteSymbol: { type: String, required: true },
  }],
});

export const Coin = model('Coin', CoinSchema);
