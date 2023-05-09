import {} from 'dotenv/config';
import fs from 'fs';
import { Client, GatewayIntentBits } from 'discord.js';
import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import * as functions from './functions/handlers/handleEvents.js';
import mongoose from 'mongoose';

// Create a new Client with the Guilds intent

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
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

client.login(process.env.BOT_TOKEN);
functions.handleEvents(client);

//export data
export { client, mongoose, fs, functions };
