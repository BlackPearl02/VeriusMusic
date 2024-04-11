import { model, Schema } from 'mongoose';
const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  userId: String,
  warns: Number,
});
export default model('User', userSchema, 'Users');
