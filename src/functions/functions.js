// import twitchStream from '../api/twitchApi/twitchStream.js';
import mongoose from 'mongoose';
export async function del(msg) {
  setTimeout(() => msg.delete(), 10000);
}
export async function reply(interaction) {
  await interaction.reply('.');
  interaction.deleteReply();
}
// export async function twitch() {
//   const guildConfigs = await mongoose.model('Config').find();
//   for (const guildConfig of guildConfigs) {
//     setInterval(() => twitchStream(guildConfig.guildId), 600);
//   }
// }
