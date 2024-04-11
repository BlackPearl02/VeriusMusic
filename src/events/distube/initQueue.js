import Config from '../../schemas/guildConfig.js';
import { client } from '../../index.js';

const name = 'initQueue';
const invoke = async (queue) => {
  let config = await Config.find({
    guildId: client.guilds.cache.map((guild) => guild.id),
  }).select('volume autoplay -_id');
  let volume = config[0].volume;
  let autoplay = config[0].autoplay;
  queue.autoplay = autoplay;
  queue.volume = volume;
};
export { invoke, name };
