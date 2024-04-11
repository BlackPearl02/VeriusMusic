import { model, Schema } from 'mongoose';
const guildSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  guildName: String,
  guildIcon: { type: String, require: false },
});
export default model('Guild', guildSchema, 'Guilds');
