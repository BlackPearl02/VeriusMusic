const name = 'guildCreate';
const once = false;
import { allGuilds } from '../../functions/mongo/guild.js';
import { config } from '../../functions/mongo/guildConfig.js';
// import { client } from '../../index.js';

async function invoke(guild) {
  allGuilds(guild);
  config(guild);
}
export { invoke, name, once };
