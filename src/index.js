import {} from 'dotenv/config';
import fs from 'fs';
import { Client, GatewayIntentBits } from 'discord.js';
import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import * as functions from './functions/handlers/handleEvents.js';
import axios from 'axios';

// Create a new Client with the Guilds intent

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

//handle events
const functionFolders = fs
  .readdirSync('./src/functions', {
    withFileTypes: true,
  })
  .filter((dirent) => dirent.isDirectory());
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder.name}`)
    .filter((file) => file.endsWith('.js'));

  for (const file of functionFiles) {
    await import(`./functions/${folder.name}/${file}`);
  }
}
//Music bot
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin({ emitEventsAfterFetching: true })],
});

// //TwichApi login

// const getToken = async () => {
//   return await axios
//     .post('https://id.twitch.tv/oauth2/token', {
//       client_id: process.env.TWITCH_ID,
//       client_secret: process.env.TWITCH_TOKEN,
//       grant_type: 'client_credentials',
//     })
//     .then((res) => {
//       //get TwitchApi token
//       const accessToken = res.data.access_token;
//       const refresh = res.data.expires_in;
//       return { accessToken, refresh };
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };
// let gettoken = await getToken();
// let accessToken = gettoken.accessToken;
// let refresh = gettoken.refresh;
// setInterval(async () => {
//   gettoken = await getToken();
// }, refresh - (10 / 100) * refresh);
// //create connection to TwitchApi
// const twitchApi = axios.create({
//   baseURL: 'https://api.twitch.tv/helix',
//   headers: {
//     'Client-ID': process.env.TWITCH_ID,
//     Authorization: 'Bearer ' + accessToken,
//   },
// });

// Login with the environment data
client.login(process.env.BOT_TOKEN);
functions.handleEvents(client);
//export data
export {
  client,
  functions,
  // twitchApi
};
