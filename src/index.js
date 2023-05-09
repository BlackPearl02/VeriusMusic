import {} from 'dotenv/config';
import fs from 'fs';
import Discord from 'discord.js';
import { Client, GatewayIntentBits } from 'discord.js';

// Create a new Client with the Guilds intent
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  async function pingOnNewMessage(channelId, autorId, userId) {
    const channel = await client.channels.fetch(channelId);
    let lastMessageTime = null;
    // Listen for new messages in the channel
    client.on('messageCreate', (message) => {
      // If the message was sent by the specified user and is not a bot message
      if (message.author.id === autorId && !message.author.bot) {
        // If this is the first message or enough time has elapsed since the last message
        if (
          lastMessageTime === null ||
          message.createdTimestamp - lastMessageTime > 5000
        ) {
          // Ping the user by mentioning them in the channel
          channel.send(`<@${userId}> New message received!`);
        }
        // Record the time of the current message
        lastMessageTime = message.createdTimestamp;
      }
    });
  }
  pingOnNewMessage(
    '673546224179216446',
    '444051772290498561',
    '972095477355020308'
  );
});

// Login with the environment data
await client.login(process.env.BOT_TOKEN);

export default client;
