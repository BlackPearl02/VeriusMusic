import { model, Schema } from 'mongoose';
const configSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  autoplay: { type: Boolean, default: true },
  volume: { type: Number, default: 20 },
  channel: { type: String, default: null },
  pingChannel: { type: String, default: null },
});
export default model('Config', configSchema, 'Configs');
